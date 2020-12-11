import {
  SSH_PUB_KEY,
  generateIso,
  downloadFileWithChrome,
  ISO_PATTERN,
  OPENSHIFT_CLUSTER_ID,
} from './shared';

import { ISO_DOWNLOAD_TIMEOUT } from './constants';


describe('Flow', () => {
  it('start from the /clusters page', () => {
    // Set CYPRESS_BASE_URL environemnt variable
    // Example: export CYPRESS_BASE_URL=http://localhost:3000
    cy.visit('');
  });

  it('get to clusters page', () => {
    cy.get(".pf-c-nav__link").contains("Clusters").click();
  });

//  it('check no cluster is there', () => {
//    cy.get(".pf-c-title").contains("No OpenShift clusters to display");
//  });

  it('check cluster appearance under management', () => {
    cy.get("#cluster-list-toolbar");
    cy.get("table > tbody ").contains(OPENSHIFT_CLUSTER_ID).click();
  });


  it('check ocm cluster details', () => {
    cy.get(".pf-c-title").contains(OPENSHIFT_CLUSTER_ID);
    cy.get('button[data-ouia-component-id="Bare Metal"]').click();
  });

  it('generate the ISO', () => {
    generateIso(SSH_PUB_KEY,'day2');
  });

  it('download the ISO', () => {
    cy.get('#bare-metal-inventory-add-host-button-download-discovery-iso').click(); // open the dialog
    cy.wait(10 * 1000); // wait few seconds otherwise HTTP 409 will be raised
    cy.get('.pf-c-modal-box__footer > .pf-m-primary').click(); // "Get Discovery ISO"
    downloadFileWithChrome(
      'button[data-test-id="download-iso-btn"]',
      ISO_PATTERN,
      ISO_DOWNLOAD_TIMEOUT,
    );
    cy.get('button[data-test-id="close-iso-btn"]').click(); // now close the dialog
  });

});
