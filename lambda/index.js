exports.handler = async function (event) {
    console.log("request:", JSON.stringify(event));
  
    // return response back to upstream caller
    return send_response(200, "Hurray! It works.");
  };
  
  const send_response = (status, body) => {
    var response = {
      statusCode: status,
      headers: {
        "Content-Type": "text/html",
      },
      body: body,
    };
    return response;
  };