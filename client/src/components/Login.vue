
<template>
    <main>
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        alt="logo">
                    PainTasker
                </a>
                <div
                    class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1
                            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Přihlašte se ke svému účtu
                        </h1>
                        <form class="space-y-4 md:space-y-6" @submit.prevent="login">
                            <div>
                                <label for="email"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                                <input type="email" name="email" id="email"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com" required="" v-model="form.email">
                            </div>
                            <div>
                                <label for="password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Heslo</label>
                                <input type="password" name="password" v-model="form.password" id="password"
                                    placeholder="••••••••"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required="">
                            </div>
                            <button
                                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Přihlásit
                                se</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Nemáte ještě účet? <a href="/register"
                                    class="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrujte
                                    se</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { apiCall } from '@/services/api.service';

export default {
    data() {
        return {
            form: {
                email: '',
                password: "",
            }
        }
    },
    methods: {
        async login() {
            const data = await apiCall({
                endpoint: "/api/v1/auth/login", body: this.form ?? {}, shouldToast: true
            })

            if (data?.responseCode === 200) {

                // Dáváme to do localStoarge, aby nám odpadla trable s CSRF
                // Ovšem, když se tu vyskytne chyba s XSS, bude to mít horší dopad... - je to prostě tradeoff
                if (data?.data?.token) {
                    localStorage.setItem("jwt", data.data.token)
                }

                this.$router.push('/dashboard')

            }


        }
    }
};
</script>