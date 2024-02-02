import Input from "../../form/Input";
import styles from "./Profile.module.css"
function Profile() {

    return (
    <section>
        <h1>Perfil</h1>
        <p>Preview Imagem</p>
        <form>
            <Input
            text="imagem"
            
            />
        </form>
    </section>
    )
}

export default Profile;
