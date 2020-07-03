<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="light">
        <b-navbar-brand href="#">
            <span class="text-dark"><b>ibs</b></span>
            <span class="text-primary"><b>apps</b></span>
            <small><code class="text-danger"> | app-counter</code></small>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>

<script>

export default {
    name: 'Navbar'
}
</script>
