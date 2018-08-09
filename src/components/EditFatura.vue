<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Editar a Fatura
        <b-link href="#/">(Listar Faturas)</b-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Usuario">
          <b-form-select id="idusuario" :state="state" v-model.trim="fatura.idusuario" :options="options" class="mb-3" />
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Nome da empresa">
          <b-form-input id="nome_empresa" :state="state" v-model.trim="fatura.nome_empresa"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Valor">
          <money v-model="fatura.valor" :state="state" v-bind="money"></money>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Data de Vencimento">
          <datepicker id="data_vencimento" :state="state" v-model.trim="fatura.data_vencimento" :language="ptBR"></datepicker>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Pagou">
          <b-form-radio-group id="pagou" v-model="fatura.pagou" name="radioSubComponent">
            <b-form-radio value="true">Sim</b-form-radio>
            <b-form-radio value="false">Não</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <ul v-if="errors && errors.length">
          <li v-for="error of errors[0].response.data">
            {{error.message}}
          </li>
        </ul>
        <b-button type="submit" variant="primary">Atualizar</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

import {Money} from 'v-money'

import Datepicker from 'vuejs-datepicker'

import {ptBR} from 'vuejs-datepicker/dist/locale'

export default {
  components: {Money, Datepicker},
  name: 'EditFatura',
  data () {
    return {
      fatura: {},
      money: {decimal: ',', thousands: '.', suffix: ' R$', precision: 2, masked: false},
      ptBR: ptBR,
      options: this.$usuarios
    }
  },
  created () {
    axios.get(`http://localhost:3000/api/faturas/` + this.$route.params.id)
    .then(response => {
      this.fatura = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put(`http://localhost:3000/api/faturas/` + this.$route.params.id, this.fatura)
      .then(response => {
        this.$router.push({
          name: 'FaturaList'
        })
      })
      .catch(e => {
        this.errors = []
        this.errors.push(e)
      })
    }
  }
}
</script>
