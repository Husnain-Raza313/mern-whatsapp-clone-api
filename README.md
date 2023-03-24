# Overview:
This REST-api is for a Whatsapp-clone, developed using Mongodb, Express and Node. It has an OTP-supported sign-up using twilio package , a sign-in feature using JWT-based-authentication and it allows user to chat with the available contacts through socket.io. It also has the functionality for searching a contact.

# Prerequisites:
* Nodejs
* Postman (for testing api)

# Main Packages Used:
* twilio (for otp)
* bcryptjs (for encryption of password)
* jsonwebtoken (for authentication)
* express (framework for Nodejs)
* mongoose (framework for mongodb)
* socket.io (for setting up the web-socket for chats)
* dotenv (for keeping credentials secured)
* cors (for allowing cross-origin requests)
* express-async-handler( Simple middleware for handling exceptions inside of async express routes )

# Main Functionalities:

* Registration
* Login
* Fetching Contact List
* Creating ChatRoom
* Real-time Chatting with Contacts
* Searching Contacts

# Setup:

To run this project on your machine locally, following steps need to be taken:
	1	Clone the repo
	First of all you need to clone this repo through following command git clone https://github.com/husnainrazadevsinc/mern-whatsapp-clone-api.git
	2	Install the dependencies
	Run the <code>npm</code> command
	3	Initiate the server
	Run the command <code>npm start</code>



