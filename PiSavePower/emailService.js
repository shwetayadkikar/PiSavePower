var mandrill = require("mandrill");

module.exports = function (config) {
	var emailService = {
		sendEmail: function () {
			mandrill_client = new mandrill.Mandrill(config.api_key);
			
			var message = {
				"html": "",
				"text": config.text,
				"subject": config.subject,
				"from_email": config.from_email,
				"from_name": config.from_name,
				"to": config.to,
				"headers": {
					"Reply-To": config.from_email
				},
				"important": false,
				"track_opens": null,
				"track_clicks": null,
				"auto_text": null,
				"auto_html": null,
				"inline_css": null,
				"url_strip_qs": null,
				"preserve_recipients": null,
				"view_content_link": null,
				"tracking_domain": null,
				"signing_domain": null,
				"return_path_domain": null,
				"merge": true,
				"merge_language": "mailchimp",
			};
			var async = false;
			var ip_pool = "Main Pool";
			var send_at = new Date();
			
			mandrill_client.messages.send({ "message": message, "async": async, "ip_pool": ip_pool }, function (result) {
				console.log(result);
			}, function (e) {
				// Mandrill returns the error as an object with name and message keys
				console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
			});
		}
	}
	return emailService;
}
