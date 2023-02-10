import React from 'react';
import {MoneyType} from "./App";
import styled from "styled-components";

type CurrentBankomatPropsType = {
    money: MoneyType
}
export const CurrentBankomat = (props: CurrentBankomatPropsType) => {

    return (
        <>
            {props.money.banknotes === 'Dollars'
                ? <BanknoteGreen>
                    <div>{props.money.banknotes}</div>
                    <div>{props.money.value}</div>
                    <div>{props.money.number}</div>
                </BanknoteGreen>

                : <BanknoteBlue>
                    <div>{props.money.banknotes}</div>
                    <div>{props.money.value}</div>
                    <div>{props.money.number}</div>
                </BanknoteBlue>
            }
        </>
    );
};


const BanknoteGreen = styled.div`
  background-color: chartreuse;
  width: 400px;
  height: 200px;
  margin: 10px`

const BanknoteBlue = styled.div`
  background-color: blue;
  width: 400px;
  height: 200px;
  margin: 10px`