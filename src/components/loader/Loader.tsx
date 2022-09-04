import React, { FC } from "react";
import styles from "./Loader.module.scss";

export const Loader: FC = () => {
  return (
    <div className="container">
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
};
