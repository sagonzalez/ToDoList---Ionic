//https://www.javascripttuts.com/using-firebase-and-angularfire2-in-an-ionic-real-time-todo-application/
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//firebase
// import { AngularFireAuth } from "angularfire2/auth"; 
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


//show message
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public tasks: FirebaseListObservable<any[]>;
  public newTask: any = {
    name: "",
    status:false
  }

  //db->AngularFireDatabase must be public
  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.tasks = db.list("/tasks");
    let date = new Date();
    let strDate = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
    let strTime = date.getHours()+"-"+date.getMinutes()+"-"+date.getSeconds();
    console.log(strDate+"/"+strTime);
  }

  addTask(event: any) {
    if (event.keyCode == 13) { //enter code
      if (!(this.newTask.name == "")) {
        this.tasks.push(this.newTask);
        this.newTask.name = "";
        this.newTask.status = "";
      }else{
        this.showMessage("Campo vacío");
      }
    }

  }//add

  updateTask(task:any) {
    this.tasks.update(task.$key, { status: !task.status });
    this.showMessage("Tarea actualizada: "+task.name);
  }//update

  removeTask(task:any) {
    const alert = this.alertCtrl.create({
      title: 'ATENCIÓN!',
      message: 'Estás seguro de eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.tasks.remove(task);
            this.showMessage("Tarea eliminada");
          }
        }
      ]
    });
    alert.present();
  }//removeTask

  showMessage(msg:string){
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log("Finish toast");
    });
  
    toast.present();
  }//showMessage

  test(task:any){
    console.log(task);
  }
}//class
