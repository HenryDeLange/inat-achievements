
// NOTE: I don't know where to find official types, so these have been manually created from: https://api.inaturalist.org/v1/docs/

// PROJECTS
export declare type ProjectsResponse = {
    total_results?: number;
    page?: number;
    per_page?: number;
    results: Project[];
}

export declare type Project = {
    id: number;
    title?: string;
    description?: string;
    slug?: string;
    icon?: string; // Not on API, added based on JSON response
    header_image_url?: string; // Not on API, added based on JSON response
    banner_color?: string; // Not on API, added based on JSON response
    location?: string; // Not on API, added based on JSON response
    latitude?: number; // Not on API, added based on JSON response
    longitude?: number; // Not on API, added based on JSON response
    search_parameters?: ProjectSearchParameters[]; // Not on API, added based on JSON response
    is_umbrella?: boolean; // Not on API, added based on JSON response
    project_type?: string; // Not on API, added based on JSON response
}

export declare type ProjectSearchParameters = {
    field?: string;
    value?: string[];
    value_keyword?: string[];
}

// PLACES
export declare type PlacesResponse = {
    total_results?: number;
    page?: number;
    per_page?: number;
    results: ShowPlace[];
}

export declare type ShowPlace = {
    id: number;
    name?: string;
    display_name?: string;
    admin_level?: number;
    ancestor_place_ids?: number[]
    bbox_area?: number;
    geometry_geojson?: PolygonGeoJson;
    location?: string; // In the format "lat,lng"
    place_type?: number;
    bounding_box_geojson?: PolygonGeoJson; // Not on API, added based on JSON response
}

export declare type PolygonGeoJson = {
    type?: string;
    coordinates?: PolygonGeoJsonCoordinatesLvl1[];
}

export declare type PolygonGeoJsonCoordinatesLvl1 = PolygonGeoJsonCoordinatesLvl2[];

export declare type PolygonGeoJsonCoordinatesLvl2 = number[];

export declare type NearbyPlacesResponse = {
    total_results?: number;
    page?: number;
    per_page?: number;
    results: NearbyPlaces
}

export declare type NearbyPlaces = {
    standard?: ShowPlace[];
    community?: ShowPlace[];
}

// OBSERVATIONS
export declare type ObservationsResponse = {
    total_results?: number;
    page?: number;
    per_page?: number;
    results: Observation[];
}

export declare type Observation = {
    id: number;
    cached_votes_total?: number;
    captive?: boolean;
    comments?: Comment[];
    comments_count?: number;
    created_at?: string;
    created_at_details?: DateDetails;
    created_time_zone?: string;
    description?: string;
    faves_count?: number;
    geojson?: PointGeoJson;
    geoprivacy?: string;
    taxon_geoprivacy?: string;
    id_please?: boolean;
    identifications_count?: number;
    identifications_most_agree?: number;
    identifications_most_disagree?: number;
    identifications_some_agree?: number;
    license_code?: string;
    location?: string; // In the format "lat,lng"
    mappable?: boolean;
    non_owner_ids?: NonOwnerIdentification[];
    num_identification_agreements?: number;
    num_identification_disagreements?: number;
    obscured?: boolean;
    observed_on?: string;
    observed_on_details?: DateDetails;
    observed_on_string?: string;
    observed_time_zone?: string;
    out_of_range?: boolean;
    photos?: Photo[];
    place_guess?: number;
    place_ids?: number[];
    project_ids?: number[];
    project_ids_with_curator_id: number[];
    project_ids_without_curator_id: number[];
    quality_grade?: string;
    reviewed_by?: number[];
    site_id: number;
    sounds?: Sound[];
    species_guess?: string;
    tags?: string[];
    taxon?: ObservationTaxon;
    time_observed_at?: string;
    time_zone_offset?: string;
    updated_at?: string;
    uri?: string;
    user?: ShowUser;
    verifiable?: boolean;
    positional_accuracy?: number; // Not on API, added based on JSON response
    identifications?: Identification[]; // Not on API, added based on JSON response
    faves?: Fave[]; // Not on API, added based on JSON response
    annotations?: Annotation[]; // Not on API, added based on JSON response
    ofvs?: ObservationField[]; // Not all fields are documented on the API, added based on JSON response
    non_traditional_projects: NonTraditionalProject[]; // Not on API, added based on JSON response
    project_observations: ProjectObservations[]; // Not on API, added based on JSON response
}

export declare type Comment = {
    id: number;
    created_at?: string;
    created_at_details?: DateDetails;
    user?: ShowUser;
    body?: string; // Not on API, added based on JSON response
    hidden?: boolean; // Not on API, added based on JSON response
}

export declare type DateDetails = {
    date?: string;
    day?: number;
    hour?: number;
    month?: number;
    week?: number;
    year?: number;
}

export declare type PointGeoJson = {
    type?: string;
    coordinates: string[]; // An array of [long, lat]
}

export declare type NonOwnerIdentification = {
    id: number;
    body?: string;
    created_at?: string;
    created_at_details?: DateDetails;
    user?: ShowUser;
}

export declare type Photo = {
    id: number;
    attribution?: string;
    license_code?: string;
    url?: string;
    original_dimensions?: PhotoDimensions; // Not on API, added based on JSON response
}

export declare type DefaultPhoto = Photo & {
    square_url?: string; // Not on API, added based on JSON response
    medium_url?: string; // Not on API, added based on JSON response
}

export declare type PhotoDimensions = { // Not on API, added based on JSON response
    height: number;
    width: number;
}

export declare type Sound = {
    id: number;
    attribution?: string;
    license_code?: string;
}

export declare type ObservationTaxon = {
    id: number;
    iconic_taxon_id: number;
    iconic_taxon_name?: string;
    is_active?: boolean;
    name?: string;
    preferred_common_name?: string;
    rank?: string;
    rank_level?: number;
    ancestor_ids?: number[];
    ancestry?: string;
    conservation_status?: RawConservationStatus;
    endemic?: boolean;
    establishment_means?: EstablishmentMeans;
    introduced?: string;
    native?: string;
    threatened?: boolean;
    default_photo?: DefaultPhoto; // Not on API, added based on JSON response
    preferred_establishment_means?: string; // Not on API, added based on JSON response
    parent_id?: number; // Not on API, added based on JSON response
}

export declare type RawConservationStatus = {
    source_id: number; // Identifier for the iNat source record associated with this status, retrievable via https://www.inaturalist.org/sources/:id.json (this endpoint is not a part of our public API and is thus subject to change or removal)
    authority?: string; // Organization that declared this status
    status?: string; // Body of the status, often coded, particularly when the status comes from the IUCN or NatureServe. Consult the authority and/or the status URL for details about the meanings of codes.
    status_name?: string; // Human-readable name of the status if it was coded.
    iucn?: number; // Coded value representing the equivalent IUCN status. Mappings: NOT_EVALUATED = 0, DATA_DEFICIENT = 5, LEAST_CONCERN = 10, NEAR_THREATENED = 20, VULNERABLE = 30, ENDANGERED = 40, CRITICALLY_ENDANGERED = 50, EXTINCT_IN_THE_WILD = 60, EXTINCT = 70
    geoprivacy?: string; // Default geoprivacy for observations of this taxon in the status's place.
}

export declare type EstablishmentMeans = {
    establishment_means?: string;
    place?: CorePlace;
}

export declare type CorePlace = {
    id: number;
    name?: string;
    display_name?: string;
}

export declare type Identification = {
    id: number;
    observation_id: number;
    body?: string;
    created_at?: string;
    updated_at?: string;
    current?: boolean;
    taxon?: ObservationTaxon;
    taxon_id: number; // Not on API, added based on JSON response
    user?: ShowUser; // Not on API, added based on JSON response
    previous_observation_taxon_id: number; // Not on API, added based on JSON response
    previous_observation_taxon?: CoreTaxon; // Not on API, added based on JSON response
    category?: string; // Not on API, added based on JSON response
}

export declare type Fave = {
    id: number;
    votable_id: number;
    created_at?: string;
    user?: ShowUser;
}

// Note: This is not the complete list of fields on the JSON object
export declare type Annotation = {
    uuid: number;
    controlled_attribute_id: number;
    controlled_value_id: number;
    vote_score?: number;
    controlled_attribute?: AnnotationControlled;
    controlled_value?: AnnotationControlled;
    user?: ShowUser;
}

export declare type ObservationField = {
    id: number;
    field_id: number;
    datatype?: string;
    name?: string;
    value?: any;
    observation_field?: ObservationFieldInfo;
    user_id: number;
    user?: ShowUser;
}

export declare type ObservationFieldInfo = {
    id: number;
    name?: string;
    name_autocomplete?: string;
    description?: string;
    datatype?: string;
    allowed_values?: string; // String separated by "|" character
    values_count?: number;
    users_count?: number;
}

// Note: This is not the complete list of fields on the JSON object
export declare type AnnotationControlled = {
    label?: string;
}

export declare type NonTraditionalProject = {
    project_id: number;
    project: Project;
}

export declare type ProjectObservations = NonTraditionalProject & {
    // Some extra fields not relevant at the moment
}

// SPECIES COUNT
export declare type SpeciesCountsResponse = {
    total_results?: number;
    page?: number;
    per_page?: number;
    results?: SpeciesCount[];
}

export declare type SpeciesCount = {
    count?: number;
    taxon?: ShowTaxon;
}

export declare type CoreTaxon = {
    id: number;
    iconic_taxon_id: number;
    iconic_taxon_name?: string;
    is_active?: boolean;
    name?: string;
    preferred_common_name?: string;
    rank?: string;
    rank_level?: number;
    default_photo?: DefaultPhoto;
    observations_count?: number;
}

export declare type ShowTaxon = CoreTaxon & {
    colors?: Color[];
    conservation_status?: ConservationStatus;
    conservation_statuses?: TaxonConservationStatus[];
    establishment_means?: EstablishmentMeans;
    preferred_establishment_means?: string;
    wikipedia_url?: string; // Not on API, added based on JSON response
    wikipedia_summary?: string; // Not on API, added based on JSON response
    taxon_photos?: TaxonPhotos[]; // Not on API, added based on JSON response
    ancestors?: CoreTaxon[]; // Not on API, added based on JSON response
}

export declare type Color = {
    id: number;
    value?: string;
}

export declare type ConservationStatus = {
    place_id: number;
    place?: CorePlace;
    status?: string;
    taxon_id: number; // Not on API, added based on JSON response
    authority?: string; // Not on API, added based on JSON response
    iucn?: number; // Not on API, added based on JSON response
    url?: string; // Not on API, added based on JSON response
    description?: string; // Not on API, added based on JSON response
    source_id: number; // Not on API, added based on JSON response
    geoprivacy?: string; // Not on API, added based on JSON response
}

export declare type TaxonConservationStatus = {
    source_id: number; // Identifier for the iNat source record associated with this status, retrievable via https://www.inaturalist.org/sources/:id.json (this endpoint is not a part of our public API and is thus subject to change or removal)
    authority?: string; // Organization that declared this status
    status?: string; // Body of the status, often coded, particularly when the status comes from the IUCN or NatureServe. Consult the authority and/or the status URL for details about the meanings of codes.
    status_name?: string; // Human-readable name of the status if it was coded.
    iucn?: number; // Coded value representing the equivalent IUCN status. Mappings: NOT_EVALUATED = 0, DATA_DEFICIENT = 5, LEAST_CONCERN = 10, NEAR_THREATENED = 20, VULNERABLE = 30, ENDANGERED = 40, CRITICALLY_ENDANGERED = 50, EXTINCT_IN_THE_WILD = 60, EXTINCT = 70
    geoprivacy?: string; // Default geoprivacy for observations of this taxon in the status's place.
    place?: CorePlace;
}

export declare type TaxonPhotos = {
    taxon_id: number;
    photo?: TaxonPhoto;
    taxon?: CoreTaxon;
}

export declare type TaxonPhoto = DefaultPhoto & {
    small_url?: string;
    large_url?: string;
    original_url?: string;
}

// SPECIES
export declare type TaxaShowResponse = {
    total_results?: number;
    page?: number;
    per_page?: number;
    results: ShowTaxon[];
}

// SPECIES SIMILAR
export declare type SpeciesSimilarResponse = {
    total_results?: number;
    page?: number;
    per_page?: number;
    results: SpeciesSimilar[];
}

export declare type SpeciesSimilar = {
    taxon: ShowTaxon;
    count: number;
}

// SPECIES SEARCH
export declare type TaxaAutocompleteResponse = {
    total_results?: number;
    page?: number;
    per_page?: number;
    results: AutocompleteTaxon[];
}

export declare type AutocompleteTaxon = {
    id: number;
    iconic_taxon_id: number;
    iconic_taxon_name?: string;
    is_active?: boolean;
    name?: string;
    preferred_common_name?: string;
    rank?: string;
    rank_level?: number;
    default_photo?: TaxonPhoto;
    matched_term?: string;
    observations_count?: number;
}

// PERSON
export declare type UserShowResponse = {
    total_results?: number;
    page?: number;
    per_page?: number;
    results: ShowUser[];
}

// PERSON SEARCH
export declare type UserAutocompleteResponse = {
    total_results?: number;
    page?: number;
    per_page?: number;
    results: ShowUser[];
}

export declare type ShowUser = {
    id: number;
    login?: string;
    spam: false,
    suspended: false,
    created_at?: string;
    login_autocomplete?: string;
    login_exact?: string;
    name?: string;
    name_autocomplete?: string;
    orcid: number;
    observations_count?: number;
    identifications_count?: number;
    journal_posts_count?: number;
    activity_count?: number;
    universal_search_rank?: number;
    roles?: string[], // Some values include: "curator"
    site_id: number;
    icon?: string; // Defaults to medium (larger than icon that defaults to thumb)
    icon_url?: string;
    description?: string;  // Not on API, added based on JSON response from the old API
    original_user_icon_url?: string;  // Not on API, added based on JSON response from the old API
}

export declare type OldApiUser = {
    id: number;
    name?: string;
    login?: string;
    description?: string;
    created_at_utc?: string;
    updated_at_utc?: string;
    identifications_count?: number;
    observations_count?: number;
    medium_user_icon_url?: string;
    original_user_icon_url?: string;
    user_icon_url?: string;
}
