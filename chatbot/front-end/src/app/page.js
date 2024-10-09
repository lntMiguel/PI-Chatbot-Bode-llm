'use client'
//cor do fundo #e4e8f0
import Header from "@/components/Header";
import Body from "@/components/body";
import Chat from "@/components/Chat";
import Botao from "@/components/Botao";

//add img
//h1 Kaipiva
//Kaipiva é uma IA que vai te ajudar a tirar suas dúvidas sobre o Senac!
//Acesse Agora! <-- Button https://uiverse.io/felipesntr/strange-bobcat-47
export default function Home() {

  return (
    <div>
    <Header/>
    <Body/>
    <Chat/>
    <Botao/>  
    </div>
  );
}