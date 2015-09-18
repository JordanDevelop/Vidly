// Put everything in one object to export at the end
var config = {}

// INK Filepicker API key
config.filepicker = 'Av4QSKNOQSObS35rGlB8Bz';

// Zencoder specific configuration
config.zencoder = {
  api_key: 'a2216d9259ff3f0e387bde6047c06a87', // API key

  output_url: 's3://vidly-bucket/', // Output location for your transcoded videos
  cdn: 'https://c.vidly.io/', // CDN URL

  notification_url: 'http://mastersoftwaretechnologies:61337/notify/', // Where Zencoder should POST notifications
  //notification_url: 'https://vidly.io/notify/',

  outputs: function(id) { // Eventually we may want to pass things to our outputs array...
    var outputs = [
      {
        label: 'MP4',
        base_url: config.zencoder.output_url,
        public: true,
        thumbnails: {
          width: 375,
          height: 220,
          number: 1,
          base_url: config.zencoder.output_url,
          filename: '{{number}}_' + id,
          public: true
        }
      },
      {
        label: 'WebM',
        base_url: config.zencoder.output_url,
        format: 'webm',
        public: true
      }
    ]
    return outputs;
  }
}

module.exports = config;
