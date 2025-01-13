import { onRegister } from "../../ui/auth/register";
import { CustomButton } from '../../components/customButton.js';

const form = document.forms.register;

form.addEventListener("submit", onRegister);
