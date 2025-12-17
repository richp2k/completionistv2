import osuIcon from "../../../../../assets/mode-osu.png";
import taikoIcon from "../../../../../assets/mode-taiko.png";
import maniaIcon from "../../../../../assets/mode-mania.png";
import fruitsIcon from "../../../../../assets/mode-fruits.png";
import { useUserSelectStore } from "../../../../../store/store";
import { GAMEMODE } from "../../../../../interfaces/Types";
import React from "react";

type GamemodeSelectProps = {
  disabled?: boolean;
  style?: React.CSSProperties;
};

export const GamemodeSelect = (props: GamemodeSelectProps) => {
  const selectedGamemode = useUserSelectStore((state) => state.gamemode);
  const setGamemode = useUserSelectStore((state) => state.setGamemode);
  return (
    // <div className="d-flex justify-content-center my-2" style={props.style}>
    <div className="d-flex justify-content-left my-2" style={props.style}>
      <img
        className={
          "img-fluid gamemode-icon px-2" +
          (selectedGamemode === GAMEMODE.OSU ? " icon-selected" : "") +
          (props.disabled ? " icon-disabled" : "")
        }
        src={osuIcon}
        alt="osu-icon"
        onClick={() => {
          setGamemode(GAMEMODE.OSU);
        }}
      />
      <img
        className={
          "img-fluid gamemode-icon px-2" +
          (selectedGamemode === "taiko" ? " icon-selected" : "") +
          (props.disabled ? " icon-disabled" : "")
        }
        src={taikoIcon}
        alt="taiko-icon"
        onClick={() => {
          setGamemode(GAMEMODE.TAIKO);
        }}
      />
      <img
        className={
          "img-fluid gamemode-icon px-2" +
          (selectedGamemode === "mania" ? " icon-selected" : "") +
          (props.disabled ? " icon-disabled" : "")
        }
        src={maniaIcon}
        alt="mania-icon"
        onClick={() => {
          setGamemode(GAMEMODE.MANIA);
        }}
      />
      <img
        className={
          "img-fluid gamemode-icon px-2" +
          (selectedGamemode === "fruits" ? " icon-selected" : "") +
          (props.disabled ? " icon-disabled" : "")
        }
        src={fruitsIcon}
        alt="fruits-icon"
        onClick={() => {
          setGamemode(GAMEMODE.CATCH);
        }}
      />
    </div>
  );
};

export default GamemodeSelect;
