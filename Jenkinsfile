pipeline {
    agent any

    environment {
        PYTHON = 'python3'
    }

    stages {

        stage('Environment Check') {
            steps {
                sh '$PYTHON --version'
                sh '$PYTHON -m pip --version'
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Backend Setup') {
            steps {
                dir('backend') {
                    sh '$PYTHON -m pip install --upgrade pip --break-system-packages'
                    sh '$PYTHON -m pip install -r requirements.txt --break-system-packages'
                }
            }
        }

        stage('Frontend Setup') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Backend Validation') {
            steps {
                dir('backend') {
                    sh '$PYTHON -m py_compile app.py'
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
