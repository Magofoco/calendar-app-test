import { Grid } from "@chakra-ui/react";
import { Calendar } from "../Calendar";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const Main = () => {
  return (
    <Grid>
      <Grid paddingBottom={10}>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>NOTE ON API:</AlertTitle>
          <AlertDescription>
            I am using the API suggested by the code task. I noticed that only
            Germany and France work, it depends on the API not me.
          </AlertDescription>
        </Alert>
      </Grid>
      <Calendar />
    </Grid>
  );
};

export default Main;
