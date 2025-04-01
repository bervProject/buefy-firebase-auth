<template>
  <section class="section">
    <div class="container">
      <h1 id="title" class="title has-text-centered">
        Vue Bulma with Firebase Auth
      </h1>
      <div id="login-box" class="card">
        <div class="card-content">
          <h1 class="title has-text-centered">Login</h1>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(login)">
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ errors, failed, passed }"
              >
                <b-field
                  label="Email"
                  :type="{ 'is-danger': failed, 'is-success': passed }"
                  :message="errors[0]"
                >
                  <b-input
                    type="email"
                    v-model="email"
                    maxlength="30"
                  ></b-input>
                </b-field>
              </ValidationProvider>
              <ValidationProvider
                name="password"
                rules="required"
                v-slot="{ errors, failed, passed }"
              >
                <b-field
                  label="Password"
                  :type="{ 'is-danger': failed, 'is-success': passed }"
                  :message="errors[0]"
                >
                  <b-input
                    type="password"
                    v-model="password"
                    password-reveal
                  ></b-input>
                </b-field>
              </ValidationProvider>
              <section class="section">
                <div class="content has-text-centered">
                  <button class="button is-primary">Login</button>
                </div>
              </section>
            </form>
          </ValidationObserver>
          <section class="section">
            <h4 class="subtitle">Another Login Method</h4>
            <div class="buttons">
              <b-button
                icon-left="google"
                icon-pack="fab"
                @click="loginWithGoogle()"
                >Google</b-button
              >
              <b-button
                icon-left="github"
                icon-pack="fab"
                @click="loginWithGithub()"
                >Github</b-button
              >
              <b-button
                icon-left="facebook"
                icon-pack="fab"
                @click="loginWithFacebook()"
                >Facebook</b-button
              >
              <b-button
                icon-left="twitter"
                icon-pack="fab"
                @click="loginWithTwitter()"
                >Twitter</b-button
              >
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="./login.ts" lang="ts" />
