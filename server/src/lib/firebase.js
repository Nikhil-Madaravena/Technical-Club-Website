const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

// Initialize Firebase Admin if environment variables exist
let bucket = null;

if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_STORAGE_BUCKET) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Handle escaped newlines in the private key string from .env
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    bucket = admin.storage().bucket();
    console.log('✅ Firebase Storage initialized');
  } catch (error) {
    console.error('❌ Firebase initialization error:', error.message);
  }
} else {
  console.log('⚠️ Firebase credentials not found in .env. Document uploads will fallback to local storage.');
}

/**
 * Uploads a file buffer to Firebase Storage and returns the public URL
 * @param {Object} file - Multer file object (must use memory storage)
 * @param {String} folder - Folder name in the bucket
 * @returns {Promise<String>} - The public URL of the uploaded file
 */
const uploadToFirebase = async (file, folder = 'documents') => {
  if (!bucket) {
    throw new Error('Firebase Storage is not configured. Please set the FIREBASE_* environment variables.');
  }

  const filename = `${folder}/${uuidv4()}-${file.originalname}`;
  const fileRef = bucket.file(filename);

  await fileRef.save(file.buffer, {
    metadata: {
      contentType: file.mimetype,
    },
  });

  await fileRef.makePublic();
  
  return `https://storage.googleapis.com/${bucket.name}/${filename}`;
};

module.exports = {
  uploadToFirebase,
  isFirebaseConfigured: () => bucket !== null
};
