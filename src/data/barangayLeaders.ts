// Punong Barangay, SK Chairperson, and public contact number for Marawi's barangays.
// Keyed by the barangay's 10-digit PSA PSGC code (see src/data/barangays.ts).
// Source: DILG Barangay Officials Directory (term 2023–2026), as of September 2026,
// compiled by the site owner. Contact numbers are the numbers listed there for each official.
// Numbers are kept exactly as DILG publishes them. Some appear for more than one barangay
// (e.g. 09301283332, 09518867028); barangays can share a contact number, so a repeat is not
// treated as an error unless a source shows that a specific entry is wrong.
// Lomidong's SK contact is left out because the DILG export lists none (N/A) for that official;
// the summary list's number for it came from another row.
// Barangays not in DILG's directory are left out; the page shows "To be added".
// Barangay and SK elections are scheduled for November 2, 2026: update this list after the new
// officials take office, and change BARANGAY_LEADERS_AS_OF.

export interface BarangayLeader {
  punongBarangay: string;
  /** Public contact number, only if the directory lists one */
  contact?: string;
  skChairperson?: string;
  /** SK Chairperson's contact number, only if the directory lists one */
  skContact?: string;
}

/** When the list was last confirmed */
export const BARANGAY_LEADERS_AS_OF: string | null = 'September 2026';

/** Who provided or confirmed the list */
export const BARANGAY_LEADERS_SOURCE: string | null = 'the DILG Barangay Officials Directory (2023–2026 term)';

export const BARANGAY_LEADERS_SOURCE_URL = 'https://www.dilg.gov.ph/barangay-officials-directory/search';

export const BARANGAY_LEADERS: Record<string, BarangayLeader> = {
  '1903617001': { punongBarangay: 'Hon. Amanoding Pomuros Rauf', skChairperson: 'Sittie Almaira Abedin Diaca' }, // Ambolong
  '1903617003': { punongBarangay: 'Hon. Sittie Hafsah Jubaerah Cosain Gandamra', skChairperson: 'Princess Shakira Bangcola Ali' }, // Bacolod Chico Proper
  '1903617006': { punongBarangay: 'Hon. Sahara Altao Bacarat', skChairperson: 'Rauf Paco Rabit' }, // Banga
  '1903617007': { punongBarangay: 'Hon. Norhanifah Abdullah H. Salic' }, // Bangco
  '1903617008': { punongBarangay: 'Hon. Amiladen Dangcag Ampuan', skChairperson: 'Ryan Oranggaga Ampuan' }, // Banggolo Poblacion
  '1903617009': { punongBarangay: 'Hon. Hamza Bubong Pimping', skChairperson: 'Sittie Hayrah Bubong Dimal' }, // Bangon
  '1903617010': { punongBarangay: 'Hon. Anwar Sagusara Tago Jr.', skChairperson: 'Sittie Azziza Ali Ansao' }, // Beyaba-Damag
  '1903617012': { punongBarangay: 'Hon. Zaalica Macalandong Ali', contact: '09082275277', skChairperson: 'Aina Sarinah Ambol Usman' }, // Bito Buadi Itowa
  '1903617013': { punongBarangay: 'Hon. Jamel Calandada Mangadang', skChairperson: 'Algazim Ampuan Hadji Jalil', skContact: '09678946118' }, // Bito Buadi Parba
  '1903617014': { punongBarangay: 'Hon. Alawiya Dimaampao Abdulgaffur', skChairperson: 'Monaim Badron Sarip' }, // Bubonga Pagalamatan
  '1903617015': { punongBarangay: 'Hon. Acsapala Faisal Radia', contact: '09301283332', skChairperson: 'Mubarak Beazar Agampong', skContact: '09301283332' }, // Bubonga Lilod Madaya
  '1903617016': { punongBarangay: 'Hon. Saidamen Azcona Said', skChairperson: 'Johan Andrada Acraman' }, // Boganga
  '1903617017': { punongBarangay: 'Hon. Solaiman Pandao Lala' }, // Boto Ambolong
  '1903617021': { punongBarangay: 'Hon. Norjana Amorod Mackno', skChairperson: 'Johaira Calderon Guira' }, // Bubong Lumbac
  '1903617022': { punongBarangay: 'Hon. Norhanie Hadji Isah Ali', skChairperson: 'Johanah Hadji Esmail Taurak' }, // Bubonga Marawi
  '1903617023': { punongBarangay: 'Hon. Mohammad Panonto Cosain', contact: '09094038942', skChairperson: 'Norain Maunda Hadji Rasul', skContact: '09384885875' }, // Bubonga Punod
  '1903617024': { punongBarangay: 'Hon. Alinor Sharief Awawr', skChairperson: 'Al-Radjie Ramli Hadji Faisal' }, // Cabasaran
  '1903617025': { punongBarangay: 'Hon. Mahid Usman Salic', skChairperson: 'Racman Romato Aminoden', skContact: '09103809612' }, // Cabingan
  '1903617027': { punongBarangay: 'Hon. Mohammad Saifollah Limbona Lao', contact: '09706791626', skChairperson: 'Sandori Baute Caris', skContact: '09706791626' }, // Cadayonan I
  '1903617029': { punongBarangay: 'Hon. Geneva Ala Gomambao', skChairperson: 'Janifah Dalidigan Ala' }, // Calocan East
  '1903617030': { punongBarangay: 'Hon. Caironsalam Dicampong Dadayan', skChairperson: 'Mohammad Hizam Latip Urab' }, // Calocan West
  '1903617032': { punongBarangay: 'Hon. Raihanisah Pondiong Salic', skChairperson: 'Alembsar Sindab H. Nassif', skContact: '09386462384' }, // Kormatan Matampay
  '1903617033': { punongBarangay: 'Hon. Rayan Abdul Laguindab', skChairperson: 'Mohammad Jaffar Lawi', skContact: '09094066662' }, // Daguduban
  '1903617035': { punongBarangay: 'Hon. Bashir Racman Maniri', contact: '09128854454' }, // Dansalan
  '1903617036': { punongBarangay: 'Hon. Dayanara Marohombsar Rasuman', contact: '09466160293', skChairperson: 'Hizam Rebollos Corobong', skContact: '09466160293' }, // Datu Sa Dansalan
  '1903617037': { punongBarangay: 'Hon. Mustapha Abdulrahman Lomondot II', skChairperson: 'Abdulwali Abdulrahman Goling' }, // Dayawan
  '1903617039': { punongBarangay: 'Hon. Sobaida Mamantar Salic', contact: '09168916559' }, // Dimaluna
  '1903617040': { punongBarangay: 'Hon. Norhanah Ali Ala', contact: '09164243673', skChairperson: 'Muamar Ali Ala', skContact: '09164243637' }, // Dulay
  '1903617042': { punongBarangay: 'Hon. Faramelah Mipantao Pandao', skChairperson: 'Faramida Pascan Usop', skContact: '09454661387' }, // Dulay West
  '1903617043': { punongBarangay: 'Hon. Princess Atheera Macadaag Salic', skChairperson: 'Shalimah Dagalangit Salic' }, // East Basak
  '1903617044': { punongBarangay: 'Hon. Sittie Rohaidah Serad Batalo', skChairperson: 'Sittie Hannah Amate Dimapingun' }, // Emie Punud
  '1903617045': { punongBarangay: 'Hon. Mariam Sani Salic' }, // Fort
  '1903617046': { punongBarangay: 'Hon. Sohary Acmad Domato', skChairperson: 'Queenisah Monarasana Dsitucalan' }, // Gadongan
  '1903617048': { punongBarangay: 'Hon. Mojeb Eppie Succor', skChairperson: 'Cyrile Jay Limas Sucor' }, // Buadi Sacayo
  '1903617049': { punongBarangay: 'Hon. Yasser Bangcola Nassif', skChairperson: 'Asnawi Macaunte Punggina' }, // Guimba
  '1903617051': { punongBarangay: 'Hon. Sittie Aina Salic Macabando-Usman', contact: '09361606378', skChairperson: 'Norsalama Manabilang Dimala', skContact: '09361606378' }, // Kapantaran
  '1903617052': { punongBarangay: 'Hon. Walid Ali Macabangon', contact: '09463306259', skChairperson: 'Naji Malic Gandamra' }, // Kilala
  '1903617057': { punongBarangay: 'Hon. Al-Touhamy Alonto Ampuan', contact: '09173040151' }, // Lilod Madaya
  '1903617058': { punongBarangay: 'Hon. Cairoding Abantas Lomantong', contact: '09511372857', skChairperson: 'Walida Sarip Barazar', skContact: '09511372857' }, // Lilod Saduc
  '1903617060': { punongBarangay: 'Hon. Potre Nurleyda Conding Salic', contact: '09109798905', skChairperson: 'Abdulkhalic Ampuan Salic' }, // Lomidong
  '1903617062': { punongBarangay: 'Hon. Amer Hassan Macumbal Lanto', contact: '09647515754', skChairperson: 'Macabangkit Hosni Macumbal Lanto III' }, // Lumbaca Madaya
  '1903617063': { punongBarangay: 'Hon. Wahab Dimaampao Dia', skChairperson: 'Cazan Dia Gandamra' }, // Lumbac Marinaut
  '1903617064': { punongBarangay: 'Hon. Abdulmalik Gundarangin Ismael', skChairperson: 'Imerhaimah Maaruhom Rogong' }, // Lumbaca Toros
  '1903617065': { punongBarangay: 'Hon. Mohammad Zia-Ul-Haq Tomawis Naga', contact: '09157752662' }, // Malimono
  '1903617066': { punongBarangay: 'Hon. Alfarouky Indol Langco', contact: '09277718643' }, // Basak Malutlut
  '1903617068': { punongBarangay: 'Hon. Allanodin Macarambon Guro' }, // Gadongan Mapantao
  '1903617069': { punongBarangay: 'Hon. Jalanie Langco Maguindanao', skChairperson: 'Abdul Jabbar Maguindanao Asnawi', skContact: '09122048207' }, // Amito Marantao
  '1903617070': { punongBarangay: 'Hon. Baironsalam Macabando Mocsana', skChairperson: 'Mohammad Ali Batabor Dimal' }, // Marinaut East
  '1903617071': { punongBarangay: 'Hon. Mohammad Al-Marjan Alikhan Radiamoda', contact: '09705913730', skChairperson: 'Abdul Bary Sulog Lawani', skContact: '09705913730' }, // Marinaut West
  '1903617072': { punongBarangay: 'Hon. Jaohar Lininding Hadji Ali' }, // Matampay
  '1903617074': { punongBarangay: 'Hon. Khalil Sumndad Rascal', contact: '09101940183' }, // Pantaon
  '1903617075': { punongBarangay: 'Hon. Acmad Usman Tagoranao', skChairperson: 'Farrajibah Disangcopan Abdullah' }, // Mipaga Proper
  '1903617076': { punongBarangay: 'Hon. Hafsah Didaagun Dimal', skChairperson: 'Princess Amielin Qailah Magandia Dimal' }, // Moncado Colony
  '1903617077': { punongBarangay: 'Hon. Nawaz Kibad Lucman' }, // Moncado Kadingilan
  '1903617079': { punongBarangay: 'Hon. Jaffar Manso Diron', skChairperson: 'Abdul Qader Diron Abedin' }, // Moriatao Loksadato
  '1903617080': { punongBarangay: 'Hon. Khalic Limgas Gandamra Jr.' }, // Datu Naga
  '1903617083': { punongBarangay: 'Hon. Acmad Patabai Taurac', contact: '09669342892' }, // Navarro
  '1903617085': { punongBarangay: 'Hon. Abosodor Romoros Abedin', skChairperson: 'Mujamel Aguip Acmad' }, // Olawa Ambolong
  '1903617086': { punongBarangay: 'Hon. Aslanie Rasib Acmad' }, // Pagalamatan Gambai
  '1903617089': { punongBarangay: 'Hon. Jamel Musa Macumpas', skChairperson: 'Yunos Toroganan Solaiman' }, // Pagayawan
  '1903617090': { punongBarangay: 'Hon. Naima Tomawis Bara', skChairperson: 'Amer Hassana Maruhom Pandapatan' }, // Panggao Saduc
  '1903617097': { punongBarangay: 'Hon. Abdulmalic Ayo Tindug', contact: '09985100162', skChairperson: 'Ranaa Rashidah Mipanga Tindug' }, // Papandayan
  '1903617098': { punongBarangay: 'Hon. Mojahid Romuros Mustapha', skChairperson: 'Baby Musor Guinal' }, // Paridi
  '1903617099': { punongBarangay: 'Hon. Alinader Abdullah Macabada' }, // Patani
  '1903617101': { punongBarangay: 'Hon. Sacayo Diamla Sumndad', contact: '09151585449', skChairperson: 'Johari Sumndad Sarip', skContact: '09754261575' }, // Pindolonan
  '1903617103': { punongBarangay: 'Hon. Omar Tampi Adiong', contact: '09279259656', skChairperson: 'Nurdeen Adiong Lomondot' }, // Poona Marantao
  '1903617105': { punongBarangay: 'Hon. Sahara Disomimba Malawani', skChairperson: 'Raodah Coral H. Usman', skContact: '09177709994' }, // Pugaan
  '1903617107': { punongBarangay: 'Hon. Abdulhalim Derogongan Limbona', contact: '09518867028', skChairperson: 'Jabbar Alabad Oti' }, // Rapasun MSU
  '1903617109': { punongBarangay: 'Hon. Amnah Manabilang Barambangan', contact: '09262531364', skChairperson: 'Arif Rasad Babao Disomangcop', skContact: '09262531364' }, // Raya Madaya I
  '1903617110': { punongBarangay: 'Hon. Alexandria Ayessa Lanto Gandamra' }, // Raya Madaya II
  '1903617111': { punongBarangay: 'Hon. Esmayatin Adiong Taib', contact: '09955331648', skChairperson: 'Anna Huzaifah Cader Sangcopan' }, // Raya Saduc
  '1903617112': { punongBarangay: 'Hon. Mohammad Macod Santican Mangondato Jr.', contact: '09453585456', skChairperson: 'Noraifa Santican Mangondato', skContact: '09453585456' }, // Rorogagus Proper
  '1903617113': { punongBarangay: 'Hon. Mohammad C. Batabor' }, // Rorogagus East
  '1903617116': { punongBarangay: 'Hon. Ashary Limgas Gandamra' }, // Sabala Manao
  '1903617117': { punongBarangay: 'Hon. Shaima Abdullah Camid', contact: '09856387097', skChairperson: 'Salman Alango Kharis', skContact: '09856387097' }, // Sabala Manao Proper
  '1903617118': { punongBarangay: 'Hon. Walid Macabando Basman', skChairperson: 'Queen Shahanie Bayabas Corobong' }, // Saduc Proper
  '1903617119': { punongBarangay: 'Hon. Omar Abdullah Macabada', contact: '09512020524' }, // Sagonsongan
  '1903617120': { punongBarangay: 'Hon. Camid Usman Gandamra Jr.', contact: '09301283332', skChairperson: 'Alikhan Gandamra Taib Jr.', skContact: '09301283332' }, // Sangcay Dansalan
  '1903617123': { punongBarangay: 'Hon. Rakim Macarambon Mackno', skChairperson: 'Johayna Amorod Awar' }, // Somiorang
  '1903617124': { punongBarangay: 'Hon. Cairoden Macadaag Ala', skChairperson: 'Aminor Ala Calauto' }, // South Madaya Proper
  '1903617125': { punongBarangay: 'Hon. H. Yassin Amboloto Salacayan', skChairperson: 'Hamdi Ibrahim Pandi', skContact: '09518867028' }, // Sugod Proper
  '1903617126': { punongBarangay: 'Hon. Mohammad Palawan Omar Jr.', skChairperson: 'Hannah Ashley Mira-Ato Radiaganding' }, // Tampilong
  '1903617127': { punongBarangay: 'Hon. Jemima Romuros Domato', skChairperson: 'Jalanie Abdul Aragasi' }, // Timbangalan
  '1903617129': { punongBarangay: 'Hon. Jalal Dimakuta H. Abdulrahman' }, // Tuca Ambolong
  '1903617131': { punongBarangay: 'Hon. Moamer Usman Pantao-O', skChairperson: 'Abdulbarie Azis Maniri' }, // Tolali
  '1903617133': { punongBarangay: 'Hon. Abdul Haris Sumndad Ambol', skChairperson: 'Norhamida Abdulazis Abdullah' }, // Toros
  '1903617134': { punongBarangay: 'Hon. Jamal Usman Ali', contact: '09069010486', skChairperson: 'Mohammad Drieza Sarip Limug' }, // Tuca
  '1903617136': { punongBarangay: 'Hon. Rakim Dalidig Cabila', skChairperson: 'Yusra-Bint Omar Lumna Amatonding' }, // Tuca Marinaut
  '1903617138': { punongBarangay: 'Hon. Sadat Ismael Masigay', skChairperson: 'Jehan Pangandaman Rasdi', skContact: '09950064750' }, // Wawalayan Calocan
  '1903617139': { punongBarangay: 'Hon. Norodin Macabando Mambuay Jr.', contact: '09518078018', skChairperson: 'Yuri Mambuay Alonto', skContact: '09518078018' }, // Wawalayan Marinaut
  '1903617141': { punongBarangay: 'Hon. Dayamon Mustapha Miguel', skChairperson: 'Arafat Alaman Mustapha' }, // Marawi Poblacion
  '1903617142': { punongBarangay: 'Hon. Yasir Naga Pangadapun', skChairperson: 'Princess Rafiah Naga Pangadapun' }, // Norhaya Village
  '1903617143': { punongBarangay: 'Hon. Norjannah Decampong Ali', contact: '09531439954', skChairperson: 'Abdul Mohaimen Decampong Ali' }, // Papandayan Caniogan
  '1903617144': { punongBarangay: 'Hon. Jalalodien M. Rasuman', skChairperson: 'Nawal Marhanie A. Rasuman', skContact: '09502054920' }, // Boganga II
  '1903617145': { punongBarangay: 'Hon. Sukarno U. Gandamra', contact: '09177078630' }, // Datu Dalidigan
  '1903617146': { punongBarangay: 'Hon. Fahad M. Usman', contact: '09702883563', skChairperson: 'Hakim U. Dimacaling', skContact: '09128839167' }, // Angoyao
  '1903617147': { punongBarangay: 'Hon. Amrola G. Balas', contact: '09301166777', skChairperson: 'Jamal Dukhan R. Corobong', skContact: '09301166777' }, // Sultan Corobong
  '1903617148': { punongBarangay: 'Hon. Kashani P. Usman', contact: '09363582821', skChairperson: 'Roslainie M. Usman', skContact: '09363582821' }, // Sultan Panoroganan
};
