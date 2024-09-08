document.addEventListener('DOMContentLoaded', function () {
    let num = document.querySelector('input#fnum')
    let lista = document.querySelector('select#flista')
    let res = document.getElementById("res")
    let valores = []

    function isNumero(n) {
        if (Number(n) >= 1 && Number(n) <= 100) {
            return true
        } else {
            return false
        }
    }

    function inlista(n, i) {
        if (i.indexOf(Number(n)) != -1) {
            return true
        } else {
            return false
        }
    }

    function adicionar() {
        if (isNumero(num.value) && !inlista(num.value, valores)) {
            // Adicionar o número na lista
            valores.push(Number(num.value)) // Adicionar o número ao array
            let item = document.createElement('option') // Criar um novo item de opção
            item.text = `Valor ${num.value} adicionado`
            lista.appendChild(item) // Adicionar o item ao select
            res.innerHTML = ' ' // Limpar a mensagem de resultado
        } else {
            window.alert('Valor inválido ou já encontrado na lista!')
        }

        num.value = '' // Limpar o campo de input
        num.focus() // Colocar o foco de volta no input
    }
})