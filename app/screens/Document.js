import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TextInput,
  Platform,
} from "react-native";
import React, { useState, useContext } from "react";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { UserContext } from "../App";

const Document = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [father, setFather] = useState("");
  const [addr, setAddre] = useState("");
  const [occupation, setOccupation] = useState("");
  const generatePdf = async () => {
    const html = `
    <html>
      <head>
        <title>Parcel Sandbox</title>
        <meta charset="UTF-8" />
        <style>
          .frame3-container {
      width: 100%;
      display: flex;
      overflow: auto;
      min-height: 100vh;
      align-items: center;
      flex-direction: column;
    }
    .frame3-frame3 {
      width: 100%;
      height: 1114px;
      display: flex;
      overflow: hidden;
      position: relative;
      align-items: flex-start;
      flex-shrink: 0;
      background-color: rgba(255, 255, 255, 1);
    }
    .frame3-frame77 {
      top: 34px;
      left: 28px;
      width: 884px;
      height: 1064px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-frame6 {
      top: 6px;
      left: 701px;
      width: 161px;
      height: 124px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text {
      top: 29px;
      left: 29px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-rectangle11 {
      top: 0px;
      left: 0px;
      width: 161px;
      height: 124px;
      position: absolute;
      border-color: rgba(0, 0, 0, 1);
      border-style: solid;
      border-width: 1px;
    }
    .frame3-frame7 {
      top: 47px;
      left: 14px;
      width: 386px;
      height: 63px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text009 {
      top: 43px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 12px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-text011 {
      top: 43px;
      left: 164px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 12px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-text013 {
      top: 15px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 16px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame15 {
      top: 312px;
      left: 14px;
      width: 115px;
      height: 16px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text015 {
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 12px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame38 {
      top: 914px;
      left: 12px;
      width: 856px;
      height: 87px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-rectangle14 {
      top: 4px;
      left: 4px;
      width: 848px;
      height: 80px;
      position: absolute;
      border-color: rgba(0, 0, 0, 1);
      border-style: solid;
      border-width: 1px;
    }
    .frame3-frame35 {
      top: 6px;
      left: 6px;
      width: 846px;
      height: 21px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-line39Stroke {
      top: 19.5px;
      left: -3px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-text017 {
      top: 3.5px;
      left: 4px;
      color: rgba(0, 0, 0, 1);
      width: 135px;
      height: auto;
      position: absolute;
      font-size: 9px;
      font-style: Bold;
      text-align: left;
      font-family: Poppins;
      font-weight: 700;
      line-height: 11.5px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame36 {
      top: 28px;
      left: 6px;
      width: 846px;
      height: 43px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-line40Stroke {
      top: 38.5px;
      left: -3px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-frame72 {
      top: 0px;
      left: 1px;
      width: 80px;
      height: 36px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text019 {
      top: 6px;
      left: 1px;
      color: rgba(0, 0, 0, 1);
      width: 100px;
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 11.5px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame73 {
      top: -0.5px;
      left: 117px;
      width: 80px;
      height: 36px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text024 {
      top: 6px;
      left: 1px;
      color: rgba(0, 0, 0, 1);
      width: 100px;
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 11.5px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame74 {
      top: -1px;
      left: 233px;
      width: 80px;
      height: 36px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text026 {
      top: 6px;
      left: 1px;
      color: rgba(0, 0, 0, 1);
      width: 100px;
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 11.5px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame75 {
      top: -1px;
      left: 349px;
      width: 146px;
      height: 36px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text028 {
      top: 6px;
      left: 1px;
      color: rgba(0, 0, 0, 1);
      width: 100px;
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 11.5px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame76 {
      top: 0px;
      left: 514px;
      width: 329px;
      height: 36px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text033 {
      top: 6px;
      left: 1px;
      color: rgba(0, 0, 0, 1);
      width: 324px;
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 11.5px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame37 {
      top: 67px;
      left: 6px;
      width: 846px;
      height: 16px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-line43 {
      top: 26.5px;
      left: 114px;
      width: 57px;
      height: 1px;
      position: absolute;
    }
    .frame3-line44 {
      top: 25px;
      left: 216px;
      width: 59px;
      height: 1px;
      position: absolute;
    }
    .frame3-line45 {
      top: 26px;
      left: 350px;
      width: 56px;
      height: 1px;
      position: absolute;
    }
    .frame3-line46 {
      top: 26px;
      left: 508px;
      width: 56px;
      height: 1px;
      position: absolute;
    }
    .frame3-frame65 {
      top: 820px;
      left: 17px;
      width: 844px;
      height: 90px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text035 {
      color: rgba(0, 0, 0, 1);
      width: 844px;
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Regular;
      text-align: left;
      font-family: Poppins;
      font-weight: 400;
      line-height: 11.5px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame66 {
      top: 3px;
      left: 3px;
      width: 75px;
      height: 16px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text044 {
      top: 2px;
      left: 3px;
      color: rgba(0, 0, 0, 1);
      width: 844px;
      height: auto;
      position: absolute;
      font-size: 9px;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) ;
      font-style: Regular;
      text-align: left;
      font-family: Poppins;
      font-weight: 400;
      line-height: 11.5px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame67 {
      top: 51px;
      left: 2px;
      width: 138px;
      height: 29px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text046 {
      left: 3px;
      color: rgba(0, 0, 0, 1);
      width: 135px;
      height: auto;
      position: absolute;
      font-size: 9px;
      font-style: Bold;
      text-align: left;
      font-family: Poppins;
      font-weight: 700;
      line-height: 11.5px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame68 {
      top: 55px;
      left: 682px;
      width: 143px;
      height: 35px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text051 {
      top: 23px;
      left: 8px;
      color: rgba(0, 0, 0, 1);
      width: 135px;
      height: auto;
      position: absolute;
      font-size: 9px;
      font-style: Bold;
      text-align: left;
      font-family: Poppins;
      font-weight: 700;
      line-height: 11.5px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame69 {
      top: 83px;
      left: 2px;
      width: 90px;
      height: 14px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text053 {
      top: -2px;
      color: rgba(0, 0, 0, 1);
      width: 844px;
      height: auto;
      position: absolute;
      font-size: 9px;
      font-style: Regular;
      text-align: left;
      font-family: Poppins;
      font-weight: 400;
      line-height: 11.5px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame731 {
      top: 1013px;
      left: 15px;
      width: 848px;
      height: 51px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-frame70 {
      top: 4px;
      left: 1px;
      width: 138px;
      height: 29px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text055 {
      left: 3px;
      color: rgba(0, 0, 0, 1);
      width: 135px;
      height: auto;
      position: absolute;
      font-size: 9px;
      font-style: Bold;
      text-align: left;
      font-family: Poppins;
      font-weight: 700;
      line-height: 11.5px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame71 {
      top: 8px;
      left: 681px;
      width: 143px;
      height: 35px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text060 {
      top: 23px;
      left: 8px;
      color: rgba(0, 0, 0, 1);
      width: 135px;
      height: auto;
      position: absolute;
      font-size: 9px;
      font-style: Bold;
      text-align: left;
      font-family: Poppins;
      font-weight: 700;
      line-height: 11.5px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame34 {
      top: 326px;
      left: 9px;
      width: 860px;
      height: 496px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-rectangle13 {
      top: 4px;
      left: 5px;
      width: 848px;
      height: 486px;
      position: absolute;
      border-color: rgba(0, 0, 0, 1);
      border-style: solid;
      border-width: 1px;
    }
    .frame3-line27 {
      top: 421px;
      left: 122px;
      width: 417px;
      height: 1px;
      position: absolute;
    }
    .frame3-frame16 {
      top: 4px;
      left: 5px;
      width: 848px;
      height: 45px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text062 {
      top: 9px;
      left: 13px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-line21Stroke {
      top: 38.5px;
      left: 0px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-frame47 {
      top: 2px;
      left: 119px;
      width: 204px;
      height: 37px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text064 {
      top: 9px;
      left: 10px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame17 {
      top: 44px;
      left: 3px;
      width: 850px;
      height: 20px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text066 {
      left: 15px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-line22Stroke {
      top: 18.5px;
      left: 3px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-frame48 {
      top: 2px;
      left: 125px;
      width: 215px;
      height: 17px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text068 {
      top: -3px;
      left: 4px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame18 {
      top: 64px;
      left: 4px;
      width: 848px;
      height: 41px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text070 {
      left: 13px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-line23Stroke {
      top: 37.5px;
      left: 1px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-frame49 {
      top: 0px;
      left: 128px;
      width: 196px;
      height: 34px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text075 {
      top: 10px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame19 {
      top: 103px;
      left: 4px;
      width: 848px;
      height: 20px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text077 {
      left: 14px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-line30Stroke {
      top: 18.5px;
      left: 2px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-frame50 {
      top: 0px;
      left: 125px;
      width: 158px;
      height: 19px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text079 {
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame20 {
      top: 124px;
      left: 4px;
      width: 851px;
      height: 24px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text081 {
      left: 18px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-line32Stroke {
      top: 17.5px;
      left: 1px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-frame51 {
      top: 0px;
      left: 127px;
      width: 184px;
      height: 19px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text083 {
      top: -1px;
      left: 5px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame23 {
      top: 182px;
      left: 2px;
      width: 853px;
      height: 23px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text085 {
      top: 1px;
      left: 16px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-line33Stroke {
      top: 18.5px;
      left: 4px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-frame24 {
      top: 0px;
      left: 538px;
      width: 84px;
      height: 23px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-line42 {
      top: -1px;
      left: 3px;
      width: 20px;
      height: 1px;
      position: absolute;
    }
    .frame3-text087 {
      top: -1px;
      left: 15px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame55 {
      top: 0px;
      left: 98px;
      width: 148px;
      height: 19px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text089 {
      left: 5px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame54 {
      top: -1px;
      left: 136px;
      width: 183px;
      height: 18px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text091 {
      left: 5px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame64 {
      top: 3px;
      left: 636px;
      width: 142px;
      height: 13px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text093 {
      top: -1px;
      left: 636px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame25 {
      top: 202px;
      left: 3px;
      width: 857px;
      height: 41px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-line34Stroke {
      top: 37.5px;
      left: 3px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-text095 {
      top: 2px;
      left: 15px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame56 {
      top: 2px;
      left: 122px;
      width: 404px;
      height: 34px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text100 {
      top: 7px;
      left: 14px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame26 {
      top: 241px;
      left: 2px;
      width: 853px;
      height: 42px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-line35Stroke {
      top: 37.5px;
      left: 4px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-text102 {
      top: -1px;
      left: 16px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame57 {
      top: 4px;
      left: 132px;
      width: 272px;
      height: 29px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text107 {
      top: 5px;
      left: 6px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame27 {
      top: 282px;
      left: 3px;
      width: 852px;
      height: 20px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-line24Stroke {
      top: 16.5px;
      left: 3px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-text109 {
      top: -3px;
      left: 15px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame58 {
      top: 1px;
      left: 128px;
      width: 216px;
      height: 16px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text111 {
      top: -4px;
      left: 4px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame28 {
      top: 299px;
      left: 3px;
      width: 852px;
      height: 22px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-line25Stroke {
      top: 19.5px;
      left: 4px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-text113 {
      top: -2px;
      left: 15px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame59 {
      top: 2px;
      left: 123px;
      width: 227px;
      height: 16px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text115 {
      top: -4px;
      left: 3px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame29 {
      top: 321px;
      left: 4px;
      width: 849px;
      height: 41px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-line36Stroke {
      top: 36.5px;
      left: 3px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-text117 {
      top: 6px;
      left: 14px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame60 {
      top: 4px;
      left: 124px;
      width: 269px;
      height: 29px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text119 {
      top: 1px;
      left: 5px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame30 {
      top: 361px;
      left: 2px;
      width: 851px;
      height: 44px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text121 {
      left: 15px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: normal;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-line37Stroke {
      top: 39.5px;
      left: 5px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-frame61 {
      top: 2px;
      left: 125px;
      width: 207px;
      height: 32px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text128 {
      top: 6px;
      left: 13px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame31 {
      top: 401px;
      left: 0px;
      width: 855px;
      height: 24px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text130 {
      left: 18px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-line26Stroke {
      top: 19.5px;
      left: 6px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-frame62 {
      top: 1px;
      left: 130px;
      width: 263px;
      height: 19px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text132 {
      top: -1px;
      left: 6px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame32 {
      top: 422px;
      left: 3px;
      width: 852px;
      height: 23px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-line38Stroke {
      top: 18.5px;
      left: 3px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-frame63 {
      top: 1px;
      left: 6px;
      width: 836px;
      height: 15px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text134 {
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Regular;
      text-align: left;
      font-family: Poppins;
      font-weight: 400;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame33 {
      top: 441px;
      left: 5px;
      width: 847px;
      height: 47px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text136 {
      top: 7px;
      left: 1px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 11px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame21 {
      top: 141px;
      left: 5px;
      width: 850px;
      height: 45px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text145 {
      top: 3px;
      left: 15px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-line31Stroke {
      top: 39.5px;
      left: 1px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-frame22 {
      top: 1px;
      left: 534px;
      width: 134px;
      height: 40px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-line41 {
      top: -1px;
      left: 4px;
      width: 40px;
      height: 1px;
      position: absolute;
    }
    .frame3-text150 {
      top: 1px;
      left: 16px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame53 {
      top: 4px;
      left: 87px;
      width: 190px;
      height: 29px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text152 {
      top: -5px;
      left: 12px;
      color: rgba(0, 0, 0, 1);
      width: 63px;
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame52 {
      top: 4px;
      left: 122px;
      width: 407px;
      height: 34px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text154 {
      top: 6px;
      left: 8px;
      color: rgba(0, 0, 0, 1);
      width: 20px;
      height: auto;
      position: absolute;
      font-size: 10px;
      font-style: SemiBold;
      text-align: left;
      font-family: Poppins;
      font-weight: 600;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame14 {
      top: 137px;
      left: 11px;
      width: 855px;
      height: 175px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-rectangle12 {
      top: 3px;
      left: 3px;
      width: 848px;
      height: 170px;
      position: absolute;
      border-color: rgba(0, 0, 0, 1);
      border-style: solid;
      border-width: 1px;
    }
    .frame3-line18 {
      top: 173px;
      left: 120px;
      width: 170px;
      height: 1px;
      position: absolute;
    }
    .frame3-frame5 {
      top: 25px;
      left: 4px;
      width: 846px;
      height: 23px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-group66 {
      top: 0px;
      left: 0px;
      width: 846px;
      height: 22.5px;
      display: flex;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 1;
    }
    .frame3-line13Stroke {
      top: 21.5px;
      left: 0px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-text156 {
      left: 5px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame40 {
      top: 3px;
      left: 120px;
      width: 145px;
      height: 17px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text158 {
      top: -3px;
      left: 6px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame4 {
      top: 3px;
      left: 4px;
      width: 846px;
      height: 23px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-group71 {
      top: 2px;
      left: -1px;
      width: 847px;
      height: 21px;
      display: flex;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 1;
    }
    .frame3-line12Stroke {
      top: 20px;
      left: 0px;
      width: 847px;
      height: 1px;
      position: absolute;
    }
    .frame3-text160 {
      left: 5px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      opacity: 0.90;
      position: absolute;
      font-size: 8px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame39 {
      top: 2px;
      left: 118px;
      width: 154px;
      height: 20px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text162 {
      left: 10px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame8 {
      top: 47px;
      left: 5px;
      width: 846px;
      height: 23px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-group67 {
      top: 1px;
      left: -2px;
      width: 846px;
      height: 21.5px;
      display: flex;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 1;
    }
    .frame3-line14Stroke {
      top: 20.5px;
      left: 0px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-text164 {
      left: 5px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame41 {
      top: 2px;
      left: 123px;
      width: 133px;
      height: 19px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text166 {
      top: -1px;
      left: 6px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame9 {
      top: 68px;
      left: 2px;
      width: 848px;
      height: 24px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-group68 {
      top: 2px;
      left: 2px;
      width: 846px;
      height: 21.5px;
      display: flex;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 1;
    }
    .frame3-line15Stroke {
      top: 20.5px;
      left: 0px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-text168 {
      left: 4px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame42 {
      top: 2px;
      left: 120px;
      width: 153px;
      height: 20px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text170 {
      top: 2px;
      left: 10px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame10 {
      top: 90px;
      left: 4px;
      width: 846px;
      height: 24px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-group69 {
      top: 2px;
      left: 1px;
      width: 846px;
      height: 21.5px;
      display: flex;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 1;
    }
    .frame3-line16Stroke {
      top: 20.5px;
      left: 0px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-text172 {
      left: 4px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame43 {
      top: 5px;
      left: 120px;
      width: 722px;
      height: 15px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text174 {
      top: -3px;
      left: 6px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame11 {
      top: 113px;
      left: 1px;
      width: 850px;
      height: 23px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-group70 {
      top: 1px;
      left: 3px;
      width: 846px;
      height: 21.5px;
      display: flex;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 1;
    }
    .frame3-line17Stroke {
      top: 20.5px;
      left: 0px;
      width: 846px;
      height: 1px;
      position: absolute;
    }
    .frame3-text176 {
      left: 5px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame44 {
      top: 4px;
      left: 127px;
      width: 155px;
      height: 18px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text178 {
      top: -4px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame12 {
      top: 134px;
      left: 2px;
      width: 849px;
      height: 41px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text180 {
      left: 6px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame13 {
      top: 0px;
      left: 524px;
      width: 174px;
      height: 40px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text185 {
      top: 1px;
      left: 12px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-line19 {
      top: 1px;
      left: 3px;
      width: 38px;
      height: 1px;
      position: absolute;
    }
    .frame3-line20 {
      top: 1px;
      left: 171px;
      width: 38px;
      height: 1px;
      position: absolute;
    }
    .frame3-frame45 {
      top: 8px;
      left: 705px;
      width: 135px;
      height: 26px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text190 {
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
    .frame3-frame46 {
      top: 6px;
      left: 125px;
      width: 319px;
      height: 28px;
      display: flex;
      overflow: hidden;
      position: absolute;
      align-items: flex-start;
      flex-shrink: 0;
    }
    .frame3-text192 {
      top: 1px;
      left: 3px;
      color: rgba(0, 0, 0, 1);
      height: auto;
      position: absolute;
      font-size: 8px;
      font-style: Medium;
      text-align: left;
      font-family: Poppins;
      font-weight: 500;
      line-height: 20px;
      font-stretch: normal;
      text-decoration: none;
    }
        </style>
      </head>
    
      <body>
        <div>
      <div class="frame3-container">
        <div class="frame3-frame3">
          <div class="frame3-frame77">
            <div class="frame3-frame6">
              <span class="frame3-text">
                <span>
                  <span>(To be captured through</span>
                  <br />
                  <span>system or obtain latest</span>
                  <br />
                  <span>photograph not older</span>
                  <br />
                  <span>than six month)</span>
                </span>
              </span>
              <img
                alt="Rectangle113022"
                src="/asset/Rectangle113022-lrws.png"
                class="frame3-rectangle11"
              />
            </div>
            <div class="frame3-frame7">
              <span class="frame3-text009"><span>No.__________</span></span>
              <span class="frame3-text011"><span>Date:__________</span></span>
              <span class="frame3-text013">
                <span>FINANCIAL INCLUSION ACCOUNT OPENING FORM</span>
              </span>
            </div>
            <div class="frame3-frame15">
              <span class="frame3-text015"><span>Applicant Details:</span></span>
            </div>
            <div class="frame3-frame38">
                <img
                alt="Rectangle142120"
                src="/asset/Rectangle142120-jo2f.png"
                class="frame3-rectangle14"
              />
              <div class="frame3-frame35">
                <img
                  alt="Line39Stroke2121"
                  src="/asset/Line39Stroke2121-n7k.svg"
                  class="frame3-line39Stroke"
                />
                <span class="frame3-text017">
                  <span>I want to nominate as under</span>
                </span>
              </div>
              <div class="frame3-frame36">
                <img
                  alt="Line40Stroke2121"
                  src="/asset/Line40Stroke2121-41j.svg"
                  class="frame3-line40Stroke"
                />
                <div class="frame3-frame72">
                  <span class="frame3-text019">
                    <span>
                      <span>Name of</span>
                      <br />
                      <span>Nominee</span>
                    </span>
                  </span>
                </div>
                <div class="frame3-frame73">
                  <span class="frame3-text024"><span>Relationship</span></span>
                </div>
                <div class="frame3-frame74">
                  <span class="frame3-text026"><span>Age</span></span>
                </div>
                <div class="frame3-frame75">
                  <span class="frame3-text028">
                    <span>
                      <span>Date of birth</span>
                      <br />
                      <span>in case of minor.</span>
                    </span>
                  </span>
                </div>
                <div class="frame3-frame76">
                  <span class="frame3-text033">
                    <span>
                      Person authorised in case to receive the amount of deposit on
                      behalf of the nominee in the event of my /minor(s) death.
                    </span>
                  </span>
                </div>
              </div>
              <div class="frame3-frame37"></div>
              <img
                alt="Line433023"
                src="/asset/Line433023-5f1n.svg"
                class="frame3-line43"
              />
              <img
                alt="Line443023"
                src="/asset/Line443023-lsvd.svg"
                class="frame3-line44"
              />
              <img
                alt="Line453023"
                src="/asset/Line453023-rccg.svg"
                class="frame3-line45"
              />
              <img
                alt="Line463023"
                src="/asset/Line463023-etxf.svg"
                class="frame3-line46"
              />
            </div>
            <div class="frame3-frame65">
              <span class="frame3-text035">
                <span>
                  <span></span>
                  <br />
                  <span></span>
                  <br />
                  <span>
                    I hereby apply for opening of a Bank Account. I declare that the
                    information provided by me in this application form is true and
                    correct. The terms and conditions applicable have been read over
                    and explained to me and have understood the same. I shall abide
                    by all the terms and conditions as may be in force from time to
                    time. I declare that I have not availed any Overdraft or Credit
                    facility from any other bank.
                  </span>
                  <br />
                  <span></span>
                </span>
              </span>
              <div class="frame3-frame66">
                <span class="frame3-text044"><span>Declaration</span></span>
              </div>
              <div class="frame3-frame67">
                <span class="frame3-text046">
                  <span>
                    <span>Place:</span>
                    <br />
                    <span>Date:</span>
                  </span>
                </span>
              </div>
              <div class="frame3-frame68">
                <span class="frame3-text051">
                  <span>Signature/LTI of Applicant</span>
                </span>
              </div>
              <div class="frame3-frame69">
                <span class="frame3-text053"><span>Nomination</span></span>
              </div>
            </div>
            <div class="frame3-frame731">
              <div class="frame3-frame70">
                <span class="frame3-text055">
                  <span>
                    <span>Place:</span>
                    <br />
                    <span>Date:</span>
                  </span>
                </span>
              </div>
              <div class="frame3-frame71">
                <span class="frame3-text060">
                  <span>Signature/LTI of Applicant</span>
                </span>
              </div>
            </div>
            <div class="frame3-frame34">
              <img
                alt="Rectangle131920"
                src="/asset/Rectangle131920-j3k5.png"
                class="frame3-rectangle13"
              />
              <img
                alt="Line271920"
                src="/asset/Line271920-yksb.svg"
                class="frame3-line27"
              />
              <div class="frame3-frame16">
                <span class="frame3-text062"><span>Full Name</span></span>
                <img
                  alt="Line21Stroke2121"
                  src="/asset/Line21Stroke2121-g3qj.svg"
                  class="frame3-line21Stroke"
                />
                <div class="frame3-frame47">
                  <span class="frame3-text064">Shreyans</span>
                </div>
              </div>
              <div class="frame3-frame17">
                <span class="frame3-text066"><span>Marital Status</span></span>
                <img
                  alt="Line22Stroke2121"
                  src="/asset/Line22Stroke2121-sfa.svg"
                  class="frame3-line22Stroke"
                />
                <div class="frame3-frame48">
                  <span class="frame3-text068"><span>${true}</span></span>
                </div>
              </div>
              <div class="frame3-frame18">
                <span class="frame3-text070">
                  <span>
                    <span>Name of Father /</span>
                    <br />
                    <span>Spouse</span>
                  </span>
                </span>
                <img
                  alt="Line23Stroke2121"
                  src="/asset/Line23Stroke2121-yfny.svg"
                  class="frame3-line23Stroke"
                />
                <div class="frame3-frame49">
                  <span class="frame3-text075"><span>${father}</span></span>
                </div>
              </div>
              <div class="frame3-frame19">
                <span class="frame3-text077"><span>Address</span></span>
                <img
                  alt="Line30Stroke2121"
                  src="/asset/Line30Stroke2121-zkk.svg"
                  class="frame3-line30Stroke"
                />
                <div class="frame3-frame50">
                  <span class="frame3-text079"><span>${addr}</span></span>
                </div>
              </div>
              <div class="frame3-frame20">
                <span class="frame3-text081"><span>Pin Code</span></span>
                <img
                  alt="Line32Stroke2121"
                  src="/asset/Line32Stroke2121-pg8.svg"
                  class="frame3-line32Stroke"
                />
                <div class="frame3-frame51">
                  <span class="frame3-text083"><span>${400023}</span></span>
                </div>
              </div>
              <div class="frame3-frame23">
                <span class="frame3-text085"><span>Aadhaar/EID No.</span></span>
                <img
                  alt="Line33Stroke2121"
                  src="/asset/Line33Stroke2121-thd7.svg"
                  class="frame3-line33Stroke"
                />
                <div class="frame3-frame24">
                  <img
                    alt="Line423022"
                    src="/asset/Line423022-sywp.svg"
                    class="frame3-line42"
                  />
                  <span class="frame3-text087"><span>PAN No.</span></span>
                  <div class="frame3-frame55">
                    <span class="frame3-text089"><span>${
                      userData.aadhar
                    }</span></span>
                  </div>
                </div>
                <div class="frame3-frame54">
                  <span class="frame3-text091"><span>${
                    userData.pan
                  }</span></span>
                </div>
                <div class="frame3-frame64"></div>
                <span class="frame3-text093"><span>asa</span></span>
              </div>
              <div class="frame3-frame25">
                <img
                  alt="Line34Stroke2121"
                  src="/asset/Line34Stroke2121-xm7u.svg"
                  class="frame3-line34Stroke"
                />
                <span class="frame3-text095">
                  <span>
                    <span>MNREGA JOB</span>
                    <br />
                    <span>CARD NO</span>
                  </span>
                </span>
                <div class="frame3-frame56">
                  <span class="frame3-text100"><span>${4636494}</span></span>
                </div>
              </div>
              <div class="frame3-frame26">
                <img
                  alt="Line35Stroke2121"
                  src="/asset/Line35Stroke2121-728d.svg"
                  class="frame3-line35Stroke"
                />
                <span class="frame3-text102">
                  <span>
                    <span>Occupation/</span>
                    <br />
                    <span>Profession</span>
                  </span>
                </span>
                <div class="frame3-frame57">
                  <span class="frame3-text107"><span>${occupation}</span></span>
                </div>
              </div>
              <div class="frame3-frame27">
                <img
                  alt="Line24Stroke2121"
                  src="/asset/Line24Stroke2121-kj1i.svg"
                  class="frame3-line24Stroke"
                />
                <span class="frame3-text109"><span>Annual Income</span></span>
                <div class="frame3-frame58">
                  <span class="frame3-text111"><span>${
                    userData.salary
                  }</span></span>
                </div>
              </div>
              <div class="frame3-frame28">
                <img
                  alt="Line25Stroke2121"
                  src="/asset/Line25Stroke2121-f6i9.svg"
                  class="frame3-line25Stroke"
                />
                <span class="frame3-text113"><span>No. of Dependents</span></span>
                <div class="frame3-frame59">
                  <span class="frame3-text115"><span>${
                    userData.dependents
                  }</span></span>
                </div>
              </div>
              <div class="frame3-frame29">
                <img
                  alt="Line36Stroke2121"
                  src="/asset/Line36Stroke2121-vtg.svg"
                  class="frame3-line36Stroke"
                />
                <span class="frame3-text117"><span>Detail of Assets</span></span>
                <div class="frame3-frame60">
                  <span class="frame3-text119"><span>N.A.</span></span>
                </div>
              </div>
              <div class="frame3-frame30">
                <span class="frame3-text121">
                  <span>
                    <span>Existing Bank A/C.</span>
                    <br />
                    <span>of family members/</span>
                    <br />
                    <span>household.</span>
                  </span>
                </span>
                <img
                  alt="Line37Stroke2121"
                  src="/asset/Line37Stroke2121-d5ck.svg"
                  class="frame3-line37Stroke"
                />
                <div class="frame3-frame61">
                  <span class="frame3-text128"><span>asa</span></span>
                </div>
              </div>
              <div class="frame3-frame31">
                <span class="frame3-text130"><span>Kisan Credit Card</span></span>
                <img
                  alt="Line26Stroke2121"
                  src="/asset/Line26Stroke2121-d1rq.svg"
                  class="frame3-line26Stroke"
                />
                <div class="frame3-frame62">
                  <span class="frame3-text132"><span>asa</span></span>
                </div>
              </div>
              <div class="frame3-frame32">
                <img
                  alt="Line38Stroke2121"
                  src="/asset/Line38Stroke2121-wrt.svg"
                  class="frame3-line38Stroke"
                />
                <div class="frame3-frame63">
                  <span class="frame3-text134">
                    <span>I request you to issue me a Rupay Card</span>
                  </span>
                </div>
              </div>
              <div class="frame3-frame33">
                <span class="frame3-text136">
                  <span>
                    <span>
                      I also understand that I am eligible for an Overdraft after
                      satisfactory operation of my account after 6 months of opening
                      my account with a Limit of Rs.5000/- (Rupees Five Thousand
                      only) for meeting
                    </span>
                    <br />
                    <span>
                      my emergency/ family needs subject to the condition that only
                      one member from the household will be eligible for overdraft
                      facility, I shall abide by the terms and conditions stipulated
                      by the Bank in this
                    </span>
                    <br />
                    <span>regard</span>
                    <br />
                    <span></span>
                  </span>
                </span>
              </div>
              <div class="frame3-frame21">
                <span class="frame3-text145">
                  <span>
                    <span>Telephone &amp;</span>
                    <br />
                    <span>Mobile No.</span>
                  </span>
                </span>
                <img
                  alt="Line31Stroke2121"
                  src="/asset/Line31Stroke2121-aaf.svg"
                  class="frame3-line31Stroke"
                />
                <div class="frame3-frame22">
                  <img
                    alt="Line412522"
                    src="/asset/Line412522-jpax.svg"
                    class="frame3-line41"
                  />
                  <span class="frame3-text150"><span>Date of Birth</span></span>
                  <div class="frame3-frame53">
                    <span class="frame3-text152"><span>asa</span></span>
                  </div>
                </div>
                <div class="frame3-frame52">
                  <span class="frame3-text154"><span>asa</span></span>
                </div>
              </div>
            </div>
            <div class="frame3-frame14">
              <img
                alt="Rectangle121920"
                src="/asset/Rectangle121920-fs8c.png"
                class="frame3-rectangle12"
              />
              <img
                alt="Line181920"
                src="/asset/Line181920-90z.svg"
                class="frame3-line18"
              />
              <div class="frame3-frame5">
                <div class="frame3-group66">
                  <img
                    alt="Line13Stroke2121"
                    src="/asset/Line13Stroke2121-y1ln.svg"
                    class="frame3-line13Stroke"
                  />
                  <span class="frame3-text156"><span>Village/Town</span></span>
                </div>
                <div class="frame3-frame40">
                  <span class="frame3-text158"><span>asa</span></span>
                </div>
              </div>
              <div class="frame3-frame4">
                <div class="frame3-group71">
                  <img
                    alt="Line12Stroke2121"
                    src="/asset/Line12Stroke2121-407.svg"
                    class="frame3-line12Stroke"
                  />
                  <span class="frame3-text160">
                    <span>Name of the Branch</span>
                  </span>
                </div>
                <div class="frame3-frame39">
                  <span class="frame3-text162"><span>asa</span></span>
                </div>
              </div>
              <div class="frame3-frame8">
                <div class="frame3-group67">
                  <img
                    alt="Line14Stroke2121"
                    src="/asset/Line14Stroke2121-8mh.svg"
                    class="frame3-line14Stroke"
                  />
                  <span class="frame3-text164">
                    <span>Sub District/ Block Name</span>
                  </span>
                </div>
                <div class="frame3-frame41">
                  <span class="frame3-text166"><span>asa</span></span>
                </div>
              </div>
              <div class="frame3-frame9">
                <div class="frame3-group68">
                  <img
                    alt="Line15Stroke2121"
                    src="/asset/Line15Stroke2121-pqub.svg"
                    class="frame3-line15Stroke"
                  />
                  <span class="frame3-text168"><span>District</span></span>
                </div>
                <div class="frame3-frame42">
                  <span class="frame3-text170"><span>asa</span></span>
                </div>
              </div>
              <div class="frame3-frame10">
                <div class="frame3-group69">
                  <img
                    alt="Line16Stroke2121"
                    src="/asset/Line16Stroke2121-gme7.svg"
                    class="frame3-line16Stroke"
                  />
                  <span class="frame3-text172">
                    <span>State SSA Code/ Ward No.</span>
                  </span>
                </div>
                <div class="frame3-frame43">
                  <span class="frame3-text174"><span>asa</span></span>
                </div>
              </div>
              <div class="frame3-frame11">
                <div class="frame3-group70">
                  <img
                    alt="Line17Stroke2121"
                    src="/asset/Line17Stroke2121-unl5.svg"
                    class="frame3-line17Stroke"
                  />
                  <span class="frame3-text176">
                    <span>Village Code/Town Code</span>
                  </span>
                </div>
                <div class="frame3-frame44">
                  <span class="frame3-text178"><span>asa</span></span>
                </div>
              </div>
              <div class="frame3-frame12">
                <span class="frame3-text180">
                  <span>
                    <span>Village Code/Town Code</span>
                    <br />
                    <span>[as per census 2011]</span>
                  </span>
                </span>
                <div class="frame3-frame13">
                  <span class="frame3-text185">
                    <span>
                      <span>Name of Village/Town</span>
                      <br />
                      <span>[as per census 2011]</span>
                    </span>
                  </span>
                  <img
                    alt="Line193022"
                    src="/asset/Line193022-8fv.svg"
                    class="frame3-line19"
                  />
                  <img
                    alt="Line203022"
                    src="/asset/Line203022-7xdn.svg"
                    class="frame3-line20"
                  />
                </div>
                <div class="frame3-frame45">
                  <span class="frame3-text190"><span>asa</span></span>
                </div>
                <div class="frame3-frame46">
                  <span class="frame3-text192"><span>asa</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </body>
    </html>
    `;
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });
    await shareAsync(file.uri);
  };
  return (
    <SafeAreaView style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ paddingVertical: 30, fontSize: 23, fontWeight: 600 }}>
        Enter Your details for form generation
      </Text>
      <TextInput
        value={father}
        style={styles.input}
        placeholder="Enter your father name"
        onChangeText={(text) => setFather(text)}
      />
      <TextInput
        value={occupation}
        style={styles.input}
        placeholder="Enter your occupation"
        onChangeText={(text) => setOccupation(text)}
      />
      <TextInput
        value={addr}
        style={styles.input}
        placeholder="Enter your address"
        onChangeText={(text) => setAddre(text)}
      />

      <Pressable
        style={{
          backgroundColor: "black",
          width: 200,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 30,
        }}
        onPress={generatePdf}
      >
        <Text style={{ color: "white" }}>Document</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Document;

const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: 50,
    borderColor: "lightgray",
    borderRadius: 10,
    marginTop: 5,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 7,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
