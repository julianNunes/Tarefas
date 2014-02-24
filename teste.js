Tarefas = new Meteor.Collection("tarefas");


if (Meteor.isClient) 
{
  Session.set("editarTexto", false);

  Template.tarefas.helpers({
     lista: function (){
        if(Session.equals("filtro", 0))       { return Tarefas.find(); }//TODOS
        else if(Session.equals("filtro", 1))  { return Tarefas.find({completo:true}); }//COMPLETO
        else if(Session.equals("filtro", 2))  { return Tarefas.find({completo:false}); }//TODOS
        return Tarefas.find();
     }
  });

  Template.tarefas.events({
    "click .btnExcluir": function() {
      Tarefas.remove(this._id);
    },

    "click #btnInserir": function(evt, tpl) {
      var nome = tpl.find("#txtTarefas").value;
      Tarefas.insert({completo:false, nome:nome})
      tpl.find("#txtTarefas").value = ''; 
    },

    "click #lkTodos": function() {
       Session.set("filtro", 0);
    },

    "click #lkCompleto": function() {
      Session.set("filtro", 1);
    },

    "click #lkPendente": function() {
      Session.set("filtro", 2); 
    },
  });

  //tpl Item

  Template.itemTarefa.rendered = function(evt, tpl) {
    if(Session.get(("editarTexto"))==this.data._id)
    {
      this.find(".txtNome").focus();
    }  
  }

  Template.itemTarefa.helpers({
     editarTexto: function(){
        return (Session.get("editarTexto")==this._id) ? true : false;
     },

     completo: function(){
      if(this.completo) { return "checked='checked'"; }
      else              { return ""; } 
     },
  });

  Template.itemTarefa.events({
    "click .ckCompleto": function(evt, tpl) {
      Tarefas.update(this._id, { $set: { completo: !this.completo}});
    },

    "click .lblNome": function(evt, tpl) {
      Session.set(("editarTexto"), this._id);
    },

    "keyup .txtNome": function(evt, tpl) {
      if(evt.keyCode == 13)
      {
        Tarefas.update(this._id, { $set: {nome:evt.srcElement.value} });
        Session.set(("editarTexto"), null); 
      }  
    }
  }); 
}

if (Meteor.isServer) 
{
}
