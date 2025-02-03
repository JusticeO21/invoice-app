import styles from "./404Page.module.css"
import { Heading } from '../../components/heading/Heading'
import { Text } from '../../components/text/Text';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const handleTakeMeHome = () => {
        return navigate("/invoice")
    }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header>
          <Heading>404</Heading>
          <Text>PAGE NOT FOUND</Text>
        </header>

        <main>
          <div className={styles.decorator}></div>
          <Text>
            But if you don't change your direction, and if you keep looking, you
            may end up where you are heading.
          </Text>
        </main>

        <footer>
          <Link to={"/invoice"}>
            <Button onClick={handleTakeMeHome}>Take me home</Button>
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default NotFoundPage
