from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_connection

app = Flask(__name__)
CORS(app)


# -------------------- Home API --------------------
@app.route("/")
def home():
    return jsonify({
        "message": "Employee Leave Management Backend is Running!"
    })


# -------------------- Get Employees --------------------
@app.route("/employees", methods=["GET"])
def get_employees():
    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("SELECT * FROM employees")
        employees = cursor.fetchall()

        cursor.close()
        connection.close()

        return jsonify(employees)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------- Apply Leave --------------------
@app.route("/leave", methods=["POST"])
def apply_leave():
    try:
        data = request.get_json()

        connection = get_connection()
        cursor = connection.cursor()

        query = """
        INSERT INTO leave_requests
        (employee_name, employee_id, leave_type, start_date, end_date, reason, status)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """

        values = (
            data["employeeName"],
            data["employeeId"],
            data["leaveType"],
            data["fromDate"],
            data["toDate"],
            data["reason"],
            "Pending"
        )

        cursor.execute(query, values)
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "Leave Applied Successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------- View Leave Requests --------------------
@app.route("/leave", methods=["GET"])
def get_leave_requests():
    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT
            id,
            employee_name AS employeeName,
            employee_id AS employeeId,
            leave_type AS leaveType,
            start_date AS fromDate,
            end_date AS toDate,
            reason,
            status
        FROM leave_requests
        ORDER BY id DESC
        """

        cursor.execute(query)
        requests = cursor.fetchall()

        cursor.close()
        connection.close()

        return jsonify(requests)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------- Approve Leave --------------------
@app.route("/leave/<int:id>/approve", methods=["PUT"])
def approve_leave(id):
    try:
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            "UPDATE leave_requests SET status='Approved' WHERE id=%s",
            (id,)
        )
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "Leave Approved Successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------- Reject Leave --------------------
@app.route("/leave/<int:id>/reject", methods=["PUT"])
def reject_leave(id):
    try:
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            "UPDATE leave_requests SET status='Rejected' WHERE id=%s",
            (id,)
        )
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "Leave Rejected Successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------- Cancel Leave --------------------
@app.route("/leave/<int:id>/cancel", methods=["PUT"])
def cancel_leave(id):
    try:
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            "UPDATE leave_requests SET status='Cancelled' WHERE id=%s",
            (id,)
        )
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "Leave Cancelled Successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------- Delete Leave --------------------
@app.route("/leave/<int:id>", methods=["DELETE"])
def delete_leave(id):
    try:
        connection = get_connection()
        cursor = connection.cursor()

        cursor.execute(
            "DELETE FROM leave_requests WHERE id=%s",
            (id,)
        )
        connection.commit()

        cursor.close()
        connection.close()

        return jsonify({"message": "Leave Deleted Successfully"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------- Run Server --------------------
if __name__ == "__main__":
    app.run(debug=True)