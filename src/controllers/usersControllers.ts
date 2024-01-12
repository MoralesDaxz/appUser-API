import { generateKsuid } from "../domain/utils";
import { USER_ID_PREFIX, UserDTO } from "../domain/entities";
import { Response, Request } from "express";
import { errorFactory } from "../factories/errorFactory";
import { firestore } from "firebase-admin";
import { db } from "../firebase/admin";

//Obtener todos los users
const getUsers = (req: Request, res: Response) => {
  db.collection("users")
    .get()
    .then((snapshot: firestore.QuerySnapshot) => {
      const documents: UserDTO[] = [];
      snapshot.forEach((doc: firestore.QueryDocumentSnapshot) => {
        documents.push({ id: doc.id, ...doc.data() } as any);
        documents.sort((bannerA: UserDTO, bannerB: UserDTO) => {
          return Number(bannerA.id) - Number(bannerB.id);
        });
      });
      res.json(documents);
    })
    .catch((error: Error) => {
      res.status(500).json({ error: "Error geting document" });
    });
};

// crear user
const createUser = async (req: Request, res: Response) => {
  try {
    const userRef = db.collection("users").doc(generateKsuid(USER_ID_PREFIX));
    const time = firestore.FieldValue.serverTimestamp();
    const userData = req.body;
    await userRef.set({
      ...userData,
      createdAt: time,
    });
    console.log("Document successfully created");
    res.status(200).json({ message: "Document successfully created" });
  } catch (error) {
    errorFactory(res, 404);
  }
};

// Actualizar un user
const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const userRef = db.collection("users").doc(id);
    const time = firestore.FieldValue.serverTimestamp();
    const userData = req.body;
    await userRef.update({ ...userData, updatedAt: time });
    console.log("Document successfully created");
    res.status(200).json({ message: "Document successfully updated" });
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({ error: `Error updating user ${error}` });
  }
};

//Obtener user por id
const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userRef = db.collection("users").doc(id);

  try {
    const documentSnapshot = await userRef.get();

    if (documentSnapshot.exists) {
      const userById = {
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      } as any;
      res.status(200).json(userById);
    } else {
      res.status(404).send(errorFactory("Document not found", 404));
    }
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).send(errorFactory("Internal server error", 500));
  }
};

//Eliminar user
const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await db.collection("users").doc(id).delete();
      res.status(200).json({ message: "Deleted user" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: `Error deleting user ${error}` });
    }
  };

export { createUser, getUsers, updateUser, getUserById, deleteUser };