import { Button, Stack } from "react-bootstrap"
import homeNavBar from "./homeNavBar";
import Login from "./login";

const Home = () => {
  return (
      <>
        <div>
          <Stack direction="horizontal" className="mt-5">
            <Button className="ms-auto" variant="danger">Add</Button>
          </Stack>
        </div>
      </>
  );
};

export default Home;
