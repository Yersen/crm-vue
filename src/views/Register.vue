<template>
    <form class="card auth-card" @submit.prevent="subminHandler">
  <div class="card-content">
    <span class="card-title">{{'CRM_Title'|localize}}</span>
    <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class ="{invalid:($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)} "
        >
        <label for="email">Email</label>
        <small 
        class="helper-text invalid"
        v-if="$v.email.$dirty && !$v.email.required"
        >{{'Message_EmailRequired'|localize}}</small>
        <small 
        class="helper-text invalid"
        v-else-if="$v.email.$dirty && !$v.email.email"
        >{{'Message_EmailValid'|localize}}</small>  
    </div>
    <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
            v-model.trim ="password"
            :class ="{invalid:($v.password.$dirty && !$v.password.required) || ($v.email.$dirty && !$v.password.minLength)} "
        >
      <label for="password">{{'Password'|localize}}</label>
        <small 
        class="helper-text invalid"
        v-if="($v.password.$dirty && !$v.password.required)"
        >{{'Message_EnterPassword'|localize}}</small>
        <small 
        class="helper-text invalid"
        v-else-if="($v.password.$dirty && !$v.password.minLength)"
        >{{'Message_MinLength'|localize}} {{'Of'|localize}} {{$v.password.params.minLength.min}} символов,сейчас {{password.length}}
        </small>
    </div>
    <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid:($v.name.$dirty && !$v.name.required)}"
        >
      <label for="name">{{'Name'|localize}}</label>
            <small 
            class="helper-text invalid"
            v-if ="($v.name.$dirty && !$v.name.required)"
            >{{'Message_EnterName'|localize}}</small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model ="agree" />
        <span>{{'AcceptRules'|localize}}</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        {{'Register'|localize}}
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      {{'HasAccount'|localize}}
      <router-link to="/login">{{'Login'|localize}}</router-link>
    </p>
  </div>
</form>
</template>

<script>
import {email, required ,minLength} from 'vuelidate/lib/validators'

export default {
    name:'register',
    metaInfo() {
        return {
            title: this.$title('Register')
        }
    },
    data: () => ({
        email: '',
        password: '',
        name: '',
        agree: false
    }),
    validations:{
        email: {email,required},
        password: {required,minLength:minLength(8)},
        name: {required},
        agree: {cheched: v => v}
    },
    methods: {
        async subminHandler(){
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            const formData = {
                email : this.email,
                password : this.password,
                name : this.name
            }
            try{
            await this.$store.dispatch('register', formData)
            this.$router.push('/')
            } catch (e){}
            
        }
    }
}
</script>