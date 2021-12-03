import React, { useEffect, useState,useContext } from "react";
import { VictoryPie,VictoryLabel} from "victory";
import {BgContainer, PieContainer, QuestionContainer} from "./styles";
import Header from "../../components/Header";
import QuestionTitle from "../../components/QuestionTitle";
import SelectCompany from "../../components/SelectCompany";
import AuthContext from "../../storage/auth-context";
import DisplayTable from "../../components/DisplayTable";
import Description from "../../components/Description";


function toPercentageTotal(num,total){
      const calc=(num/total*100)
      const percent=Math.round(calc)
      return `${percent}%`
    }


const transformData=(dataset) =>{
  const totals = dataset[0].map((data, i) => {
    return dataset.reduce((memo, curr) => {
      return memo + curr[i].y;
    }, 0);
  });
  return dataset.map((data) => {
    return data.map((datum, i) => {
      return { x: datum.x, y: (datum.y / totals[i]) * 100 };
    });
  });
}




export default function First(){
  const {question}=useContext(AuthContext)
  
  const header=[{title:['Área','Sim','Não'], background:[,'#8CB5F8','#CE8FEF']},
  {title:['Área','Feminino','Masculino'], background:[,'#CE8FEF','#8CB5F8']},
  {title:['Área','20-29','30-39','40-49','50-59','60+'], background:[,'#B4E4E8','#FFC499','#A6E3B6','#FDE49A','#F6B3AE']},
  {title:['Área','Fundamental Incompleto','Fundamental Completo',	'Médio Incompleto',	 
  'Médio Completo','Superior Incompleto','Superior Completo'], background:[,'#B4E4E8','#FFC499','#A6E3B6','#FDE49A','#F6B3AE','#DDADF4']},
  {title:['Área','Total'], background:['#ADE8F4','#ADE8F4']},
  {title:['Área','Solteiro(a)','Casado(a)','Separado(a)/\nDivorciado(a)','União estável','Viúvo(a)'], background:[,'#B4E4E8','#FFC499','#A6E3B6','#FDE49A','#F6B3AE']},
  {title:['Empresa','Total'], background:['#ADE8F4','#ADE8F4']},
  {title:['Área',	'Menos \nde um ano',	'1-5',	'6-10',	'11-15','16-20',	'21+'], background:[,'#B4E4E8','#FFC499','#A6E3B6','#FDE49A','#F6B3AE','#DDADF4']},
  {title:['Empresa',	'Menos \nde um ano',	'1-5',	'6-10',	'11-15','16-20',	'21+'], background:[,'#B4E4E8','#FFC499','#A6E3B6','#FDE49A','#F6B3AE','#DDADF4']},
]
  
  const pieList=(header,question)=>{
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const data=[]
    const newList=question.slice(-1)[0].slice(1)
    const total=newList.reduce(reducer)
    
    for(let i=0;i<header.length-1;i++){
      const pieItem={
        x: toPercentageTotal(question.slice(-1)[0][i+1],total),
        y: parseInt(question.slice(-1)[0][i+1]) 
      }
     
      data.push(pieItem)
    }
    return data
  }


    return(
        <>
        

<Header location='/'/>
<SelectCompany/>
<BgContainer>
    <QuestionTitle>DESCRIÇÃO</QuestionTitle>
    <Description>
    {question.description}
    </Description>

    <QuestionTitle>DADOS</QuestionTitle>
    <QuestionContainer style={{'justifyContent':'center'}}>
      <DisplayTable header={header[4]} info={question.dados}/>
    </QuestionContainer>

    <QuestionTitle>SEXO</QuestionTitle>
    <QuestionContainer>
      <DisplayTable header={header[1]} info={question.sexo}/>
      <PieContainer>
        <VictoryPie
        animate={{
          duration: 1000,
          
        }}
        data={pieList(header[1].title,question.sexo)}
        colorScale={header[1].background.slice(1)}
        labelPosition={'centroid'}
        style={{ labels: { fontWeight: "bold"}}}
      />
      </PieContainer>
    </QuestionContainer>

  <QuestionTitle>IDADE</QuestionTitle>
  <QuestionContainer>
    <DisplayTable header={header[2]} info={question.idade}/>
    <PieContainer>
      <VictoryPie
      animate={{
        duration: 1000,
      }}
      data={pieList(header[2].title,question.idade)}
      colorScale={header[2].background.slice(1)}
      labelPosition={'centroid'}
      style={{ labels: { fontWeight: "bold"}}}
    />
    </PieContainer>
  </QuestionContainer>

  <QuestionTitle>ESCOLARIDADE</QuestionTitle>
  <QuestionContainer>
    <DisplayTable header={header[3]} info={question.escolaridade}/>
    <PieContainer>
      <VictoryPie
      animate={{
        duration: 1000,
      }}
      data={pieList(header[3].title,question.escolaridade)}
      colorScale={header[3].background.slice(1)}
      labelPosition={'centroid'}
      style={{ labels: { fontWeight: "bold"}}}
    />
    </PieContainer>
</QuestionContainer>

<QuestionTitle >ESTADO CIVIL</QuestionTitle>
  <QuestionContainer>
    <DisplayTable header={header[5]} info={question.estadoCivil}/>
    <PieContainer>
      <VictoryPie
      animate={{
        duration: 1000,
      }}
      data={pieList(header[5].title,question.estadoCivil)}
      colorScale={header[5].background.slice(1)}
      labelPosition={'centroid'}
      style={{ labels: { fontWeight: "bold"}}}
    />
    </PieContainer>
  </QuestionContainer>

  <QuestionTitle >EMPRESA</QuestionTitle>
  <QuestionContainer style={{'justifyContent':'center'}}>
    <DisplayTable header={header[6]} info={question.company}/>
  </QuestionContainer>

  <QuestionTitle >Experiência na função atual</QuestionTitle>
  <QuestionContainer>
    <DisplayTable header={header[7]} info={question.experiencia}/>
    <PieContainer>
      <VictoryPie
      animate={{
        duration: 1000,
      }}
      data={pieList(header[7].title,question.experiencia)}
      colorScale={header[7].background.slice(1)}
      labelPosition={'centroid'}
      style={{ labels: { fontWeight: "bold"}}}
    />
    </PieContainer>
  </QuestionContainer>

  <QuestionTitle >Tempo (em anos) de trabalho na empresa</QuestionTitle>
  <QuestionContainer>
    <DisplayTable header={header[8]} info={question.tempo}/>
    <PieContainer>
      <VictoryPie
      animate={{
        duration: 1000,
      }}
      data={pieList(header[8].title,question.tempo)}
      colorScale={header[8].background.slice(1)}
      labelPosition={'centroid'}
      style={{ labels: { fontWeight: "bold"}}}
    />
    </PieContainer>
  </QuestionContainer>



  <QuestionTitle >Você já sofreu algum acidente na plataforma?</QuestionTitle>
  <QuestionContainer>
    <DisplayTable header={header[0]} info={question.q10}/>
    <PieContainer>
      <VictoryPie
      animate={{
        duration: 1000,
      }}
      data={pieList(header[0].title,question.q10)}
      colorScale={header[0].background.slice(1)}
      labelPosition={'centroid'}
      style={{ labels: { fontWeight: "bold"}}}
    />
    </PieContainer>
  </QuestionContainer>






</BgContainer>


  </>  
    )
}
