import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Country } from 'src/app/models/country';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  countries: Country[] = [];
  pagedCountries: Country[] = [];
  filteredCountries: Country[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalItems: number = 0;
  message: string = '';
  selectedCountry: Country | null = null;
  countryToDelete: number | null = null;
  newCountryName: string = '';
  searchID: number | null = null;
  searchName: string = '';
  private modalRef: NgbModalRef | undefined;

  // Get reference to the create modal template
  @ViewChild('createModal') createModal!: TemplateRef<any>;

  constructor(private countriesService: CountriesService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countriesService.getCountries().subscribe({
      next: (countries) => {
        this.countries = countries;
        this.totalItems = countries.length;
        this.updateFilteredCountries();
        this.message = ''; 
      },
      error: (err) => {
        console.error('Error fetching countries:', err);
        this.message = 'Failed to load countries. Please try again later.';
      }
    });
  }

  updateFilteredCountries(): void {
    let filtered = this.countries;

    if (this.searchID !== null && this.searchID !== undefined) {
      filtered = filtered.filter(country => country.countryID === this.searchID);
    }

    if (this.searchName) {
      filtered = filtered.filter(country =>
        country.CountryName.toLowerCase().includes(this.searchName.toLowerCase())
      );
    }

    this.totalItems = filtered.length;
    this.updatePagedCountries(filtered);
  }

  updatePagedCountries(filteredCountries: Country[]): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedCountries = filteredCountries.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.currentPage = page;
    this.updatePagedCountries(this.filteredCountries);
  }

  onSearch(): void {
    this.currentPage = 1;
    this.updateFilteredCountries();
  }

  openCreateModal(): void {
    if (this.createModal) {
      this.modalRef = this.modalService.open(this.createModal);
    }
  }

  onCreateCountry(): void {
    if (this.newCountryName) {
      const newCountry: Country = {
        countryID: this.countries.length + 1,
        CountryName: this.newCountryName
      };

      this.countriesService.createCountry(newCountry).subscribe({
        next: () => {
          this.loadCountries();
          this.message = 'Country created successfully!';
          if (this.modalRef) {
            this.modalRef.close();
          }
        },
        error: (err) => {
          console.error('Error creating country:', err);
          this.message = 'Failed to create country. Please try again later.';
        }
      });
    } else {
      this.message = 'Country name is required!';
    }
  }

  viewDetails(countryID: number): void {
    console.log('View details for country ID:', countryID);
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  updateClick(content: any, countryID: number): void {
    this.selectedCountry = this.countries.find(c => c.countryID === countryID) || null;
    if (this.selectedCountry) {
      this.modalRef = this.modalService.open(content);
    }
  }

  deleteClick(content: any, countryID: number): void {
    this.countryToDelete = countryID;
    if (this.countryToDelete !== null) {
      this.modalRef = this.modalService.open(content);
    }
  }

  onSaveCountry(): void {
    if (this.selectedCountry) {
      if (this.selectedCountry.countryID !== undefined) {
        this.countriesService.updateCountry(this.selectedCountry.countryID, this.selectedCountry).subscribe({
          next: () => {
            this.loadCountries();
            this.message = 'Country updated successfully!';
            if (this.modalRef) {
              this.modalRef.close();
            }
          },
          error: (err) => {
            console.error('Error updating country:', err);
            this.message = 'Failed to update country. Please try again later.';
          }
        });
      } else {
        this.message = 'Country ID is missing!';
      }
    }
  }

  onConfirmDelete(): void {
    if (this.countryToDelete !== null) {
      this.countriesService.deleteCountry(this.countryToDelete).subscribe({
        next: () => {
          this.loadCountries();
          this.message = 'Country deleted successfully!';
          if (this.modalRef) {
            this.modalRef.close();
          }
        },
        error: (err) => {
          console.error('Error deleting country:', err);
          this.message = 'Failed to delete country. Please try again later.';
        }
      });
    }
  }
}
