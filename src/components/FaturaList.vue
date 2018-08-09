<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Lista de Faturas
        <b-link href="#/add-fatura">(Adicionar Fatura)</b-link>
      </h2>
      <b-table striped hover :items="faturas" :fields="fields">
        <template slot="actions" scope="row">
          <b-btn size="sm" @click.stop="editfatura(row.item._id)">Editar</b-btn>
          <b-btn size="sm" variant="danger" @click.stop="deletefatura(row.item)">Deletar</b-btn>
        </template>
      </b-table>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors">
          {{error.message}}
        </li>
      </ul>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

var moment = require('moment')

export default {
  name: 'FaturaList',
  data () {
    return {
      fields: {
        idusuario: { label: 'Usuario', sortable: true, formatter: (value, key, item) => { return this.$usuarios.find(x => x.value === item.idusuario).text } },
        nome_empresa: {label: 'Nome Empresa', sortable: true},
        valor: { label: 'Valor', sortable: true, formatter: (value, key, item) => { return item.valor.toLocaleString('de-DE', { style: 'currency', currency: 'BRL' }) } },
        data_vencimento: { label: 'Data de vencimento', sortable: true, formatter: (value, key, item) => { return moment(item.data_vencimento).format('DD/MM/YYYY') } },
        pagou: { label: 'Pagou', sortable: true, formatter: (value, key, item) => { return item.pagou === true ? 'Sim' : 'Não' } },
        actions: { label: 'Ação', 'class': 'text-center' }
      },
      faturas: [],
      errors: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/api/faturas`)
    .then(response => {
      this.faturas = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    editfatura (faturaid) {
      this.$router.push({
        name: 'EditFatura',
        params: { id: faturaid }
      })
    },
    deletefatura (fatura) {
      axios.delete('http://localhost:3000/api/faturas/' + fatura._id)
      .then((result) => {
        this.faturas.splice(this.faturas.indexOf(fatura), 1)
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>
