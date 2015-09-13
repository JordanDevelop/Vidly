// Put everything in one object to export at the end
var config = {}

// INK Filepicker API key
config.filepicker = 'Av4QSKNOQSObS35rGlB8Bz';

// Zencoder specific configuration
config.zencoder = {
  api_key: 'a2216d9259ff3f0e387bde6047c06a87', // API key

  output_url: 's3://vidly-videos-dev/zensockets/', // Output location for your transcoded videos

  //notification_url: 'http://vidly.io/notify/', // Where Zencoder should POST notifications
  notification_url: 'http://mastersoftwaretechnologies.com:7008/notify/',

  outputs: function(id) { // Eventually we may want to pass things to our outputs array...
    var outputs = [
      {
        label: 'MP4',
        base_url: config.zencoder.output_url,
        public: true,
        thumbnails: {
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
