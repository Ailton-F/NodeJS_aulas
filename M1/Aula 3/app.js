console.log('Hello, world!')

function anos_ate_maior18(idade){
  maior_idade = 18 - idade
  if (maior_idade <= 0){
    console.log('Você já tem 18 anos!')
  }else if (maior_idade == 1) {
      console.log('Falta 1 ano até você completar 18')
  }else {
    console.log(`Faltam ${maior_idade} anos até você completar 18`)
  }
}

anos_ate_maior18(18)
