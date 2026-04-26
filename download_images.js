// download_images.js
const fs = require('fs');
const https = require('https');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// Fallback high-res real architectural links that don't rely on unsplash blocked CDN
const imgMap = {
  'hero.jpg': 'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'hero-card.jpg': 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
  'stats-bg.jpg': 'https://images.pexels.com/photos/1296068/pexels-photo-1296068.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'about-img.jpg': 'https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg?auto=compress&cs=tinysrgb&w=800',
  'services-bg.jpg': 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'acp.jpg': 'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=600',
  'glass.jpg': 'https://images.pexels.com/photos/373905/pexels-photo-373905.jpeg?auto=compress&cs=tinysrgb&w=600',
  'alum.jpg': 'https://images.pexels.com/photos/830891/pexels-photo-830891.jpeg?auto=compress&cs=tinysrgb&w=600',
  'louvers.jpg': 'https://images.pexels.com/photos/273204/pexels-photo-273204.jpeg?auto=compress&cs=tinysrgb&w=600',
  'hpl.jpg': 'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=600',
  'elevation.jpg': 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=600',
  'why-sub.jpg': 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=400',
  'cta-band.jpg': 'https://images.pexels.com/photos/1107775/pexels-photo-1107775.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'process-bg.jpg': 'https://images.pexels.com/photos/331323/pexels-photo-331323.jpeg?auto=compress&cs=tinysrgb&w=1920'
};

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function run() {
  for (const [filename, url] of Object.entries(imgMap)) {
    console.log(`Downloading ${filename}...`);
    try {
      await download(url, path.join(imgDir, filename));
    } catch(e) {
      console.log(`Failed ${filename}`);
    }
  }
  console.log("Done");
}

run();
