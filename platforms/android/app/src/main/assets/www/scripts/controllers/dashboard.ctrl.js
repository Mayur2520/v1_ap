angular.module('MyApp')
	.controller('DashboardController', ['$scope', '$http', '$route', '$location', '$window', '$timeout', 'Upload', 'Dashboard', function ($scope, $http, $route, $location, $window, $timeout, Upload, Dashboard) {

        document.addEventListener("deviceready",onDeviceReady,false);
        function onDeviceReady(){
        
        var push = PushNotification.init({ "android": {"senderID": "267838426161"}});
            push.on('registration', function(data) {
                
                Dashboard.updateDeviceId().save({data}).$promise.then(function (response) {
                });
            });

                   
            push.on('notification', function(data) {
            // alert(data.title+" Message: " +data.message);

            Swal({
                imageUrl: '../../images/communications.png',
                imageWidth: 50,
                imageHeight: 50,
                title: data.title,
                text: data.message,
              }).then(function()  {
              })

                });

                push.on('error', function(e) {
                //alert(e);
                });
        }

        $scope.dateOptionsFilters = {
            changeYear: true,
            changeMonth: true,
            yearRange:'2019:-0',
            };

        function formatDate(date){
           
            if(date)
            {
                var dd = new Date(date).getDate();
                var mm = new Date(date).getMonth()+1;
                var yy = new Date(date).getFullYear();
            }
        
            return yy+'/'+mm+'/'+dd;
    }
        
        $scope.getDashboardValues = function(Date_from, date_to)
        {

            // if(Date_from ||  date_to)
            {
                if(Date_from)
                {
                    var from_dsDate =  Date_from;
                }
                else
                {
                    var from_dsDate =  new Date();
                }

                if(date_to)
                {
                    var to_dsDate =  date_to;
                }
                else
                {
                    var to_dsDate =  from_dsDate;
                }
            }

            Dashboard.getDashboardValues().save([{from_dsDate:formatDate(from_dsDate),to_dsDate:formatDate(to_dsDate)}]).$promise.then(function (response) {
                if(!response.status)
                $scope.dashboardValues = response.dashboardValues;
            });
        };

        $scope.SendNotifuication = function()
        {
            Dashboard.ExeNotification('sample User',"Sample message sent from device")
        }


        function getSession()
        {
            Entity.getSession().query().$promise.then(function (response) {
				$scope.userDetails = response;
				$window.localStorage["userDetails"] = JSON.stringify($scope.userDetails);
            });   
		} getSession();


    }]);

