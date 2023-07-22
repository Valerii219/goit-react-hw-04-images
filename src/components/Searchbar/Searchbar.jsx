import { Component } from 'react';
import css from 'styles.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Searchbar extends Component {
  state = {
    searchText: '',
  };
  handleNameChange = e => {
    this.setState({ searchText: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchText.trim() === '') {
      toast('Write something in input');
      return;
    }
    this.props.onSubmit(this.state.searchText);
    this.setState({ searchText: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchText}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
