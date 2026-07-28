pipeline {
    agent any

    environment {
        PYTHON = 'C:\\Users\\DANESH\\AppData\\Local\\Programs\\Python\\Python314\\python.exe'
    }

    stages {

        stage('Environment Check') {
            steps {
                bat '"%PYTHON%" --version'
                bat '"%PYTHON%" -m pip --version'
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Backend Setup') {
            steps {
                dir('backend') {
                    bat '"%PYTHON%" -m pip install --upgrade pip'
                    bat '"%PYTHON%" -m pip install -r requirements.txt'
                }
            }
        }

        stage('Frontend Setup') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Backend Validation') {
            steps {
                dir('backend') {
                    bat '"%PYTHON%" -m py_compile app.py'
                }
            }
        }
    }

    post {
        success {
            echo 'BUILD SUCCESS'
        }

        failure {
            echo 'BUILD FAILED'
        }

        always {
            cleanWs()
        }
    }
}