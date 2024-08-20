pipeline {
    agent any 
    stages {
        stage('Build') { 
            steps {
                // sh 'pip3 install -r requirements.txt'
                echo 'siap bos ku'
            }
        }
        stage('Test') { 
            steps {
                echo 'siap bos ku'
            }
        }
        stage('Deploy') { 
            steps {
                sh 'ssh  -o StrictHostKeyChecking=no hendras@10.10.1.2 "cd docker/frontend/my-sikemas; \
                bash  runtest.sh"'
            }
        }
    }
}
