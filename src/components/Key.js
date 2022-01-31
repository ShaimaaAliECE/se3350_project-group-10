import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  key: {},
}));

export default function Key(props) {
  const index = props.index;
  const styles = useStyles();
  console.log(this);
  return (
    <div className={styles.key} key={index + 1}>
      {index + 1}
    </div>
  );
}
