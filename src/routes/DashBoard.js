/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useContext, useState } from "react";

import { UserContext } from "../firebase/auth";
import { useFirestore } from "../firebase/firestore";

import SignOut from "../components/SignOut";
import Button from "../components/Button";

export default function DashBoard() {
  const user = useContext(UserContext);

  const {
    documentSnapshots: actionsDS,
    collectionRef: actionsCF
  } = useFirestore("actions");

  return (
    <>
      <div
        css={css`
          position: fixed;
          top: 12px;
          right: 12px;
        `}
      >
        <SignOut />
      </div>

      <div
        css={css`
          margin: 120px auto;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
        `}
      >
        <Button
          id="playOneOfUSounds"
          onClick={() =>
            actionsCF.add({
              type: "sound",
              name: "test.mp3"
            })
          }
        >
          OneOfU's Sound
        </Button>
        <Button
          id="releaseMawbstersBallons"
          onClick={() =>
            actionsCF.add({
              type: "balloons"
            })
          }
        >
          Mawbster's Balloons
        </Button>
        <input id="file-upload" type="file" />
        <Button id="file-submit" type="file">
          upload
        </Button>
      </div>
    </>
  );
}
