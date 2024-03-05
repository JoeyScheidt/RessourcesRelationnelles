import { Platform } from "react-native";

export const API_URL = Platform.OS === "web" ? 'http://localhost:8888/public' : 'http://10.167.129.98:8888/public';