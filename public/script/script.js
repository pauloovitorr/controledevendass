let span_qtd = document.querySelector('#span_qtd')
let span_valor = document.querySelector('#span_valor')
let span_comissao = document.querySelector('#span_comissao')
let qtd = []


function soma(valor,id,qtd1){

   let estoque = document.getElementById(`${id}`)

   if(estoque.textContent <= (qtd1 - 1)){

    // logica para contar as peças
    qtd.push(valor)
    span_qtd.textContent = qtd.length

    // logica para somar o valor de vendas
   let int_valor = parseFloat(span_valor.textContent) + parseFloat(valor) 
   span_valor.textContent = int_valor.toFixed(2)

   // logica para calcular comissão
   let comissao_format = parseFloat(span_valor.textContent) * 0.40
   span_comissao.textContent = comissao_format.toFixed(2)

   
   // logica para controlar estoque

   estoque.textContent = parseInt(estoque.textContent) + 1

   return
   }

   else{
      alert('Produto em falta no estoque')
   }

   
}


function sub(valor,id){

   let estoque = document.getElementById(`${id}`)

   if(parseFloat(span_valor.textContent) > 0 ){

    // logica para contar as peças

      if(qtd.includes(valor)){

         let indice = qtd.indexOf(valor)

         qtd.splice(indice, 1)

         span_qtd.textContent = qtd.length

         // logica para subtrair o valor de vendas
        let int_valor = parseFloat(span_valor.textContent) - parseFloat(valor) 
        span_valor.textContent = int_valor.toFixed(2)
     
         // logica para calcular comissão
         let comissao_format = parseFloat(span_valor.textContent) * 0.40
         span_comissao.textContent = comissao_format.toFixed(2)

         // logica do estoque

         estoque.textContent = parseInt(estoque.textContent) - 1
         
    
         return
      }
      else{
         alert('Este produto não está na lista')
         
      }
    
   }
   else{
    alert('Valor zerado !!')
    
   }

}



      
   
 
