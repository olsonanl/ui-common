(function( $, undefined ) {
    $.KBWidget({
        name: "KBaseGWASPopTable",
        parent: "kbaseWidget",
        version: "1.0.0",
        //width: 600,
        options: {
            color: "black",
            width: 780
        },
        workspaceURL: "https://kbase.us/services/workspace",


        init: function(options) {
            this._super(options);

            var self = this;
            var $helloDiv = $("<div/>")
            .css("color", this.options.color)

            //.append("<iframe width=900 height=600 src='http://140.221.85.85/maps/gmap3v5.1.1/demo/population-cluster1.html' />")
            .on("click", function(event) {
                self.trigger("showHelloCards", 
                { 
                  message: "hello!", 
                  event: event
                });
            });

            this.workspaceClient = new workspaceService(this.workspaceURL);

            this.$elem.append($helloDiv);

            this.workspaceClient.get_object({"id" : 'arabidopsis_population_atwell_et_al', "type" : "GwasPopulation", "workspace": 'genotype_phenotype'}, 
                function(data){
                    console.log(data);
                    self.collection = data;
                    //self.$elem.append("<h3>GWAS Population Ecotype Details</h3>");

                    var $domainTable = $("<table/>").addClass("table table-bordered table-striped");                           
                    var ecotypeDetails = self.collection.data.ecotype_details;
                    $domainTable.append('<thead><tr><th>Country</th><th>Ecotype Id</th><th>Native Name</th><th>Region</th><th>Site</th><th>Stock Parent</th></tr></thead>');

                    //$domainTable.append('<')
                    for (var i=0; i<ecotypeDetails.length && i < 10; i++) {
                        $domainTable.append($("<tr>")
                            .append($("<td>").append(ecotypeDetails[i].country))
                            .append($("<td>").append(ecotypeDetails[i].ecotype_id))
                            .append($("<td>").append(ecotypeDetails[i].nativename))
                            .append($("<td>").append(ecotypeDetails[i].region))
                            .append($("<td>").append(ecotypeDetails[i].site))
                            .append($("<td>").append(ecotypeDetails[i].stockparent)));
                    }
                    self.$elem.append($domainTable);



                   
                },

                self.rpcError
            );

            return this;
        },

/*
        render: function(options) {
            this.showMessage("<img src='" + this.options.loadingImage + "'/>");

            var self = this;
//            this.workspaceClient.get_object({"id" : this.options.bambi_run_result_id, "type" : "BambiRunResult", "workspace": this.options.workspace_id}, 
            this.workspaceClient.get_object({"id" : 'arabidopsis_population_atwell_et_al', "type" : "GwasPopulation", "workspace": 'genotype_phenotype'}, 
                function(data){
                    console.log(data);
                    self.collection = data;
                    //self.$elem.append("<h3>GWAS Population Details</h3>");
                    self.$elem.append($("<div />").
                    append($("<table/>").addClass("kbgo-table")
                        .append($("<tr/>").append("<td>ID</td><td>" + self.collection.data.genome.kbase_genome_id + "</td>"))
                        .append($("<tr/>").append("<td>Name</td><td>" + self.collection.data.genome.kbase_genome_name + "</td>"))
                        .append($("<tr/>").append("<td>Source</td><td>" + self.collection.data.genome.source + "</td>"))
                        .append($("<tr/>").append("<td>Source Name</td><td>" + self.collection.data.genome.source_genome_name + "</td>"))
                        .append($("<tr/>").append("<td>Description</td><td>" + self.collection.data.GwasPopulation_description + "</td>"))
                    ));
                },

                self.rpcError
            );
            this.hideMessage();
            return this;
        },
*/
        getData: function() {
            return {
                type:"GwasPopulation",
                id: this.options.objId,
                workspace: this.options.workspaceID,
                title: "GWAS Population Ecotype Details"
            };
        }
    });
})( jQuery )