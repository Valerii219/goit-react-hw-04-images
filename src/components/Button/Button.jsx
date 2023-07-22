import css from "styles.module.css";

function LoadMore({ loadMore }) {

  return (
    <button type="button" className={css.Button} onClick={loadMore}>
      Load More
    </button>
  );
}

export default LoadMore;