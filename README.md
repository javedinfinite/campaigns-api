Backend  :
---------------------
	
	How to setup in local:
		clone this repository in your local system: <git clone https://github.com/javedinfinite/campaigns-api.git>
		run this command in the root folder of this api: <npm install>
		now run this command to run the api : <npm start>
		
	Now you can paste following endpoints in the browser and check
	i) http://localhost:3000/campaigns
		This endpoint will return all campaigns sorted in decresing order based on the field "totalAmount"
		It will contain   the fields title, totalAmount, backersCount and endDate. 
		
	ii) http://localhost:3000/campaigns/active
		This will return all the active campaigns created in last 30 days(the default queryparam is 30)
		You can also get all the active campaigns created in last x days by using queryparam "http://localhost:3000/campaigns/active?days=x"
		e.g. http://localhost:3000/campaigns/active?days=45
		
	iii) http://localhost:3000/campaigns/closed
		This will return all the closed campaigns
		
		

