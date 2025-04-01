<template>
  <section class="section">
    <div class="container">
      <div class="content has-text-centered">
        <h1 class="title">Firebase Auth Demo</h1>
        <div class="columns is-multiline">
          <div class="column is-half">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img v-if="photoUrl" :src="photoUrl" />
                      <img
                        v-else
                        src="https://bulma.io/images/placeholders/96x96.png"
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <p v-if="name" class="title is-4">{{ name }}</p>
                    <p v-else class="title is-4">User</p>
                    <p class="subtitle is-6">{{ email }}</p>
                  </div>
                </div>
              </div>
            </div>
            <h2 class="title">Update Profile</h2>
            <b-field label="Name">
              <b-input type="text" v-model="input.name"></b-input>
            </b-field>
            <b-field label="Photo URL">
              <b-input type="url" v-model="input.photoURL"></b-input>
            </b-field>
            <div class="buttons">
              <button class="button is-link" @click="update">Update</button>
            </div>
          </div>
          <div class="column is-half">
            <h3 class="subtitle">Link Your Account</h3>
            <div class="buttons">
              <b-button
                v-bind:disabled="isLinkedGoogle"
                icon-left="google"
                icon-pack="fab"
                @click="linkWithGoogle()"
                >Google</b-button
              >
              <b-button
                v-bind:disabled="isLinkedGithub"
                icon-left="github"
                icon-pack="fab"
                @click="linkWithGithub()"
                >Github</b-button
              >
              <b-button
                v-bind:disabled="isLinkedFacebook"
                icon-left="facebook"
                icon-pack="fab"
                @click="linkWithFacebook()"
                >Facebook</b-button
              >
              <b-button
                v-bind:disabled="isLinkedTwitter"
                icon-left="twitter"
                icon-pack="fab"
                @click="linkWithTwitter()"
                >Twitter</b-button
              >
            </div>
            <h4 class="subtitle">Another Menu</h4>
            <div class="buttons">
              <button class="button is-danger" @click="deleteAccount">
                Delete Account
              </button>
              <button class="button is-warning" @click="logout">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="./home.ts" lang="ts" />
