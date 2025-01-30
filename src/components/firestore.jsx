import {App} from "./firebase.js";
import { getFirestore } from "firebase/firestore";
const db = getFirestore(App);
export default db;
