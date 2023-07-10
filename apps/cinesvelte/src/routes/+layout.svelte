<script>
  import "../styles.css";
  import logo from "$lib/images/logo.svg";
  import moviedb from "$lib/images/moviedb.svg";
</script>

<nav>
  <a class="logo-a" href="/"><img src={logo} alt="cinesvelt" /></a>
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
  <p>
    Data provided by

    <a
      class="moviebd"
      href="https://www.themoviedb.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={moviedb} alt="moviedb" />
    </a>
  </p>
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
    text-decoration: none;
  }
  a.logo-a {
    display: inline-block;
    height: 2.4rem;
  }

  a.moviebd {
    margin: 0 2px;
    height: 0.9rem;
    display: inline-block;
    /* border: crimson solid 1px; */
  }

  img {
    height: 100%;
  }
</style>
