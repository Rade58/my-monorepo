<script>
  import "../styles.css";
  import logo from "$lib/images/logo.svg";
</script>

<nav>
  <a href="/"><img src={logo} alt="cinesvelt" /></a>
  <div class="links">
    <a href="/search">Search</a>
    <a href="/watchlist">Watchlist</a>
    <a href="/login">Login</a>
  </div>
</nav>

<main>
  <slot />
</main>

<footer>
  <p>Data provided by</p>
</footer>

<style>
  nav {
    display: flex;
    width: 100%;
    height: 3rem;
    align-items: center;
    justify-content: space-between;
    max-width: var(--column);
    padding: 0 var(--side);
    color: var(--accent);
  }

  a {
    color: inherit;
    display: inline-block;
    height: 2.4rem;
    text-decoration: none;
  }

  img {
    height: 100%;
  }
</style>
