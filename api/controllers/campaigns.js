const { default: axios } = require("axios");

exports.get_all_campaigns = async (req, res, next) => {
  const response = await axios.get(
    "https://testapi.donatekart.com/api/campaign"
  );
  const data_list = response.data;

  data_list.sort((a, b) => {
    return b.totalAmount - a.totalAmount;
  });

  const newCampaignList = [];

  data_list.forEach((element) => {
      let temp_object = {};
      temp_object.title = element.title,
      temp_object.totalAmount = element.totalAmount,
      temp_object.backersCount = element.backersCount,
      temp_object.endDate = element.endDate
      newCampaignList.push(temp_object);
  });

  res.status(200).json(newCampaignList);
};

const checkActiveCampaignLastDays = (endDate, created, daysOfCreation) =>{
  const e = endDate.substring(0, 10).split('-')
  const c = created.substring(0, 10).split('-')
  const endingDate = new Date(e[0], e[1], e[2])
  const createdDate =  new Date(c[0], c[1], c[2])
  const todayDate = new Date() 
  const daysDifference = (endingDate-createdDate)/(1000 * 3600 * 24) 

  if(endingDate>=todayDate && daysDifference<=daysOfCreation)
    return true
  else 
    return false
}

exports.get_all_active_campaigns = async (req, res, next) => {
  const response = await axios.get(
    "https://testapi.donatekart.com/api/campaign"
  );
  const data_list = response.data;
  const activeCampaignList = [];
  let daysOfCreation = 30
  if(Object.keys(req.query).length  && req.query.days!=undefined && req.query.days>=0)
      daysOfCreation = req.query.days
try{
  data_list.forEach((element) => {
    if(checkActiveCampaignLastDays(element.endDate, element.created, daysOfCreation))
    {
      let temp_object = {};
      temp_object.title = element.title,
      temp_object.totalAmount = element.totalAmount,
      temp_object.backersCount = element.backersCount,
      temp_object.endDate = element.endDate
      temp_object.created = element.created
      activeCampaignList.push(temp_object);
    }
    
  });
}
catch(e){
  console.log(e)
}

  if(activeCampaignList.length==0)
    res.status(200).json({data:[], message: `The number of active campaigns created within ${daysOfCreation} days are: NULL`});
  else
    res.status(200).json({data:activeCampaignList, message:'success'});
};
