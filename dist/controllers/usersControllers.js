"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUserById = exports.updateUser = exports.getUsers = exports.createUser = void 0;
const utils_1 = require("../domain/utils");
const entities_1 = require("../domain/entities");
const errorFactory_1 = require("../factories/errorFactory");
const firebase_admin_1 = require("firebase-admin");
const admin_1 = require("../firebase/admin");
//Obtener todos los users
const getUsers = (req, res) => {
    admin_1.db.collection("users")
        .get()
        .then((snapshot) => {
        const documents = [];
        snapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
            documents.sort((bannerA, bannerB) => {
                return Number(bannerA.id) - Number(bannerB.id);
            });
        });
        res.json(documents);
    })
        .catch((error) => {
        res.status(500).json({ error: "Error geting document" });
    });
};
exports.getUsers = getUsers;
// crear user
const createUser = async (req, res) => {
    try {
        const userRef = admin_1.db.collection("users").doc((0, utils_1.generateKsuid)(entities_1.USER_ID_PREFIX));
        const time = firebase_admin_1.firestore.FieldValue.serverTimestamp();
        const userData = req.body;
        await userRef.set({
            ...userData,
            createdAt: time,
        });
        console.log("Document successfully created");
        res.status(200).json({ message: "Document successfully created" });
    }
    catch (error) {
        (0, errorFactory_1.errorFactory)(res, 404);
    }
};
exports.createUser = createUser;
// Actualizar un user
const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const userRef = admin_1.db.collection("users").doc(id);
        const time = firebase_admin_1.firestore.FieldValue.serverTimestamp();
        const userData = req.body;
        await userRef.update({ ...userData, updatedAt: time });
        console.log("Document successfully created");
        res.status(200).json({ message: "Document successfully updated" });
    }
    catch (error) {
        console.error("Error creating document:", error);
        res.status(500).json({ error: `Error updating user ${error}` });
    }
};
exports.updateUser = updateUser;
//Obtener user por id
const getUserById = async (req, res) => {
    const id = req.params.id;
    const userRef = admin_1.db.collection("users").doc(id);
    try {
        const documentSnapshot = await userRef.get();
        if (documentSnapshot.exists) {
            const userById = {
                id: documentSnapshot.id,
                ...documentSnapshot.data(),
            };
            res.status(200).json(userById);
        }
        else {
            res.status(404).send((0, errorFactory_1.errorFactory)("Document not found", 404));
        }
    }
    catch (error) {
        console.error("Error getting user by ID:", error);
        res.status(500).send((0, errorFactory_1.errorFactory)("Internal server error", 500));
    }
};
exports.getUserById = getUserById;
//Eliminar user
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await admin_1.db.collection("users").doc(id).delete();
        res.status(200).json({ message: "Deleted user" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: `Error deleting user ${error}` });
    }
};
exports.deleteUser = deleteUser;
