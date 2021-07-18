const { default: axios } = require("axios");

exports.get_all_campaigns = async (req, res, next) => {
  try {
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
      (temp_object.title = element.title),
        (temp_object.totalAmount = element.totalAmount),
        (temp_object.backersCount = element.backersCount),
        (temp_object.endDate = element.endDate);
      newCampaignList.push(temp_object);
    });

    res.status(200).json({ data: newCampaignList, message: "success" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ data: [], message: e });
  }
};

const checkActiveCampaignLastDays = (endDate, created, daysOfCreation) => {
  const endingDate = new Date(endDate);
  const createdDate = new Date(created);
  const todayDate = new Date();
  const daysDifference = (endingDate - createdDate) / (1000 * 3600 * 24);

  if (endingDate >= todayDate && daysDifference <= daysOfCreation) return true;
  else return false;
};

exports.get_all_active_campaigns = async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://testapi.donatekart.com/api/campaign"
    );
    const data_list = response.data;
    const activeCampaignList = [];
    let daysOfCreation = 30;
    if (
      Object.keys(req.query).length &&
      req.query.days != undefined &&
      req.query.days >= 0
    )
      daysOfCreation = req.query.days;

    data_list.forEach((element) => {
      if (
        checkActiveCampaignLastDays(
          element.endDate,
          element.created,
          daysOfCreation
        )
      ) {
        let temp_object = {};
        (temp_object.title = element.title),
          (temp_object.totalAmount = element.totalAmount),
          (temp_object.backersCount = element.backersCount),
          (temp_object.endDate = element.endDate);
        temp_object.created = element.created;
        activeCampaignList.push(temp_object);
      }
    });

    if (activeCampaignList.length == 0)
      res.status(200).json({
        data: [],
        message: `The number of active campaigns created within ${daysOfCreation} days are: NULL`,
      });
    else res.status(200).json({ data: activeCampaignList, message: "success" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ data: [], message: e });
  }
};

const checkClosedCampaigns = (endDate, procuredAmount, totalAmount) => {
  const endingDate = new Date(endDate);
  const todayDate = new Date();
  if (procuredAmount >= totalAmount || endingDate < todayDate) return true;
  else return false;
};

exports.get_all_closed_campaigns = async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://testapi.donatekart.com/api/campaign"
    );
    const data_list = response.data;
    const closedCampaignList = [];

    data_list.forEach((element) => {
      if (
        checkClosedCampaigns(
          element.endDate,
          element.procuredAmount,
          element.totalAmount
        )
      ) {
        let temp_object = {};
        (temp_object.title = element.title),
          (temp_object.totalAmount = element.totalAmount),
          (temp_object.backersCount = element.backersCount),
          (temp_object.endDate = element.endDate);
        temp_object.created = element.created;
        temp_object.procuredAmount = element.procuredAmount;
        closedCampaignList.push(temp_object);
      }
    });
    if (closedCampaignList.length == 0)
      res
        .status(200)
        .json({
          data: [],
          message: `The number of closed campaigns are: NULL`,
        });
    else res.status(200).json({ data: closedCampaignList, message: "success" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ data: [], message: e });
  }
};
