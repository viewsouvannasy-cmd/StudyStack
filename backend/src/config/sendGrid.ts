import sgMail from "@sendgrid/mail";
import { getEnv } from "../utils/getEnv.js";

sgMail.setApiKey(getEnv("SENDGRID_API_KEY"));

export default sgMail;
