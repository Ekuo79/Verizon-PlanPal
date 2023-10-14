from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def menu():
    return "Hello World!"


# Chatbox API CALL
@app.route('/home', methods=['POST'])
def home():
    #get query string
    userInput = request.args.get('userInput')
    print(userInput)


    if userInput:
        #use api call
        return {"userInput": userInput}




if __name__ == "__main__":
    app.run(debug=True)